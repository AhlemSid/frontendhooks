import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from "react";
import { fetchscategories } from '../../services/scategorieservice';
import axios from "axios"

import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'

import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)



const Insertarticle = ({ addproduct,updateProduct }) => {
  const [show, setShow] = useState(false);
  const [article, setArticle] = useState({})
  const [scategories, setScategories] = useState([])
  const [files, setFiles] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false);


  useEffect(() => {
    getscategories()
  }, [])


  const getscategories = async () => {
    try {
      await fetchscategories().then(res =>
        setScategories(res.data))
    } catch (error) {
      console.log(error)
    }
  }

  const onInputChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const from = e.currentTarget;
    if (from.checkValidity() === true) {
      addproduct(article);
      handleReset()
      setValidated(false);
    }
    setValidated(true);
  }

  const handleReset = () => {
    setArticle({})
    handleClose()
  }

  const serverOptions = () => {
    console.log("server pond");
    return {
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        console.log(file);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "ecommerce");
        data.append("cloud_name", "dhpqsjpug");
        data.append("public_id", file.name);
        axios
          .post("https://api.cloudinary.com/v1_1/dhpqsjpug/upload", data)
          .then((response) => response.data)
          .then((data) => {
            console.log(data);
            setArticle({ ...article, imageart: data.url });
            load(data);
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
            error("Upload failed");
            abort();
          });
      }
    };
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Nouveau
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajout article</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="container ">
            <div className="row">
              <div >


                <div className='form mt-3'>
                  <Form className="border p-3"  >
                    <Row className="mb-2">
                      <Form.Group as={Col} md="6" >
                        <Form.Label >Référence *</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Référence"
                          name='reference'
                          value={article.reference}
                          onChange={(e) => onInputChange(e)}
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="6">
                        <Form.Label>Désignation *</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Désignation"
                          name='designation'
                          value={article.designation}
                          onChange={(e) => onInputChange(e)}
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-2">
                      <Form.Group className="col-md-6">
                        <Form.Label>Marque *</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          placeholder="Marque"
                          name='marque'
                          value={article.marque}
                          onChange={(e) => onInputChange(e)}
                        />

                      </Form.Group>
                      <Form.Group as={Col} md="6">
                        <Form.Label>Prix</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Prix"
                          name='prix'
                          value={article.prix}
                          onChange={(e) => onInputChange(e)}
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
                          value={article.qtestock}
                          name='qtestock'
                          onChange={(e) => onInputChange(e)}
                          placeholder="Qté stock"
                        />

                      </Form.Group>
                      
                      <Form.Group as={Col} md="6">
                        <Form.Label>Catégorie</Form.Label>
                        <Form.Control
                          as="select"
                          type="select"
                          name='scategorieID'
                          value={article.scategorieID}
                          onChange={(e) => onInputChange(e)}
                        >
                          <option> choisir une Scategorie</option>
                          {scategories.map((scat, index) =>
                            <option key={index} value={scat._id}>{scat.nomscategorie}</option>
                          )}


                        </Form.Control>
                      </Form.Group>
                    </Row>

                    <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
                      <FilePond

                        files={files}
                        acceptedFileTypes="image/*"
                        onupdatefiles={setFiles}
                        allowMultiple={false}
                        server={serverOptions()}
                        name="file"

                      />
                    </div>

                    {/* <Link className="btn btn-outline-danger mx-2" to="/articles">
        Cancel
        </Link> */}
                  </Form>
                </div>
              </div>
            </div>

          </div>


        </Modal.Body>
        <Modal.Footer>
          <td><Button variant="warning" onClick={(e) => handleSubmit(e)} >submit 
          <i className="fa-regular fa-floppy-disk"></i></Button></td>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Insertarticle