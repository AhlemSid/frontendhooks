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



const Insertcategorie = ({ addcategorie,updateCtegorie}) => {
  const [show, setShow] = useState(false);
  const [categorie, setCategorie] = useState({})
 
  const [files, setFiles] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false);


  useEffect(() => {
   
  }, [])


 

  const onInputChange = (e) => {
    setCategorie({ ...categorie, [e.target.name]: e.target.value });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const from = e.currentTarget;
    if (from.checkValidity() === true) {
      addcategorie(categorie);
      handleReset()
      setValidated(false);
    }
    setValidated(true);
  }

  const handleReset = () => {
    setCategorie({})
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
            setCategorie({ ...categorie, imagecategorie: data.url });
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
                        <Form.Label >nomcategorie *</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="nomcategorie"
                          name='nomcategorie'
                          value={categorie.nomcategorie}
                          onChange={(e) => onInputChange(e)}
                        />
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

export default Insertcategorie