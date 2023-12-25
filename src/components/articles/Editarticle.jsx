import React, { useState } from 'react';
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';

import { fetchscategories } from "../../services/scategorieservice"
import { useEffect } from 'react';
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'

import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


const Editarticle = ({ show, handleClose, art, updateProduct }) => {

  const [article, setArticle] = useState(art)
  const [files, setFiles] = useState([]);

  const [scategories, setScategories] = useState([])
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    getScategories()
    setFiles([
      {
        source: art.imageart,
        options: { type: 'local' }
      }
    ])
  }, [])
  const getScategories = async () => {
    await fetchscategories().then(res => {
      setScategories(res.data)
    })
  }
  const handlechange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value })
  }



  const handleSubmit = async (e) => {

   
    e.preventDefault();
    const from = e.currentTarget;
    if (from.checkValidity() === true) {
      
    updateProduct(article);
      handleReset()
      setValidated(false);
    }
    setValidated(true);
  }

  const handleReset = () => {
    setArticle({})
    setFiles([])
    handleClose()
  }
  const serverOptions = () => {
    console.log('server pond');
    return {
      load: (source, load, error, progress, abort, headers) => {
        var myRequest = new Request(source);
        fetch(myRequest).then(function (response) {
          response.blob().then(function (myBlob) {
            load(myBlob);
          });
        });
      },
      process: (fieldName, file, metadata, load, error, progress, abort) => {

        console.log(file)
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'ecommerce');
        data.append('cloud_name', 'dhpqsjpug');
        data.append('public_id', file.name);

        axios.post('https://api.cloudinary.com/v1_1/dhpqsjpug/upload', data)
          .then((response) => response.data)
          .then((data) => {
            console.log(data);
            setArticle({ ...article, imageart: data.url });
            load(data);
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
            error('Upload failed');
            abort();
          });
      },
    };
  };
  return (
    <div >

      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <h2>Ajouter un produit</h2>
          </Modal.Header>
          <Modal.Body>
            <div className="container w-100 d-flex justify-content-center">
              <div>
                <div className='form mt-3'>
                  <Row className="mb-2">
                    <Form.Group as={Col} md="6" >
                      <Form.Label >Référence *</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Référence"
                        name="reference"
                        value={article.reference}
                        onChange={(e) => handlechange(e)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Saisir Référence Article
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      <Form.Label>Désignation *</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="designation"
                        placeholder="Désignation"
                        value={article.designation}
                        onChange={(e) => handlechange(e)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Saisir Désignation
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-2">
                    <Form.Group className="col-md-6">
                      <Form.Label>Marque *</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          required
                          name="marque"
                          placeholder="Marque"
                          value={article.marque}
                          onChange={(e) => handlechange(e)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Marque Incorrecte
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      <Form.Label>Prix</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Prix"
                        name="prix"
                        value={article.prix}
                        onChange={(e) => handlechange(e)}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group className="col-md-6 ">
                      <Form.Label>
                        Qté stock<span className="req-tag">*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="number"
                        name="qtestock"
                        value={article.qtestock}
                        onChange={(e) => handlechange(e)}
                        placeholder="Qté stock"
                      />
                      <Form.Control.Feedback type="invalid">
                        Qté stock Incorrect
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      <Form.Label>S/Catégorie</Form.Label>
                      <Form.Control
                        as="select"
                        type="select"
                        name="scategorieID"
                        value={article.scategorieID}
                        onChange={(e) => handlechange(e)}
                      >
                        <option></option>
                        {scategories.map((scat) => <option key={scat._id}
                          value={scat._id}>{scat.nomscategorie}</option>
                        )}
                      </Form.Control>
                    </Form.Group>
                  </Row>
                  <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
                    <FilePond

                      files={files}
                      acceptedFileTypes="image/*"
                      onupdatefiles={setFiles}
                      allowMultiple={true}
                      server={serverOptions()}
                      name="file"

                    />
                  </div>

                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={(e) => handleSubmit(e)} >submit
              <i className="fa-regular fa-floppy-disk"></i></Button>
            <Button type="button" className="btn btn-warning"
              onClick={() => handleReset()}>Annuler</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )

}

export default Editarticle
