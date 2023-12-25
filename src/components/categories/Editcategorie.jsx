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


const Editcategorie = ({ show, handleClose, cat, updateCategorie }) => {

  const [categorie, setCategorie] = useState(cat)
  const [files, setFiles] = useState([]);


  const [validated, setValidated] = useState(false);

  useEffect(() => {
    
    setFiles([
      {
        source: cat.imagecategorie,
        options: { type: 'local' }
      }
    ])
  }, [])
  
  const handlechange = (e) => {
    setCategorie({ ...categorie, [e.target.name]: e.target.value })
  }



  const handleSubmit = async (e) => {

   
    e.preventDefault();
    const from = e.currentTarget;
    if (from.checkValidity() === true) {
      
    updateCategorie(categorie);
      handleReset()
      setValidated(false);
    }
    setValidated(true);
  }

  const handleReset = () => {
    setCategorie({})
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
            setCategorie({ ...categorie, imagecategorie: data.url });
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
                      <Form.Label >nomcategorie *</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="nomcategorie"
                        name="nomcategorie"
                        value={categorie.nomcategorie}
                        onChange={(e) => handlechange(e)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Saisir nomcategorie categorie
                      </Form.Control.Feedback>
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

export default Editcategorie
