import axios from "axios";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Editscategorie = () => {

    let navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([])

    const [scategorie, setScategorie] = useState({
        nomscategorie: "",
        imagescategorie: "",
        categorieID: ""

    })

    useEffect(() => {
        getcategories()
        loadscategorie()
    }, [])

    const getcategories = async () => {
        try {
            const res = await axios.get("http://localhost:3001/api/categories")
            setCategories(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3001/api/scategories/${id}`, scategorie);
        navigate("/scategories");
    };
    const loadscategorie = async () => {
        const result = await
            axios.get(`http://localhost:3001/api/scategories/${id}`);
        setScategorie(result.data);
    };
    const onInputChange = (e) => {
        setScategorie({ ...scategorie, [e.target.name]: e.target.value });
    };
  return (
    <div className="container">
    <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

            <h4 align="center">Ajout categorie</h4>
            <div className='form mt-3'>
                <Form className="border p-3" onSubmit={(e) => onSubmit(e)}>
                    <Row className="mb-2">
                        <Form.Group as={Col} md="6" >
                            <Form.Label >Nom Scategorie *</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="nomscategorie"
                                value={scategorie.nomscategorie}
                                name="nomscategorie"
                                onChange={(e) => onInputChange(e)}

                            />
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Image *</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="imagescategorie"
                                name="imagescategorie"
                                value={scategorie.imagescategorie}
                                onChange={(e) => onInputChange(e)}
                            />
                        </Form.Group>
                    </Row>
                    
                    <Row className="mb-3">
                        
                        <Form.Group as={Col} md="12">
                            <Form.Label>SCatégorie</Form.Label>
                            <Form.Control
                                as="select"
                                type="select"
                                value={scategorie.categorieID}
                                name="categorieID"
                                onChange={(e) => onInputChange(e)}

                            >
                                <option>Choisirune Scatégories</option>
                                {categories.map((cat, index) =>
                                    <option value={cat._id}>{cat.nomcategorie}</option>
                                )}
                            </Form.Control>
                        </Form.Group>
                    </Row>
                    <button type="submit" className="btn btn-outline-primary">
                                Submit
                            </button>
                            <Link className="btn btn-outline-danger mx-2" to="/scategories">
                                Cancel
                            </Link>
                </Form>
            </div>
        </div>
    </div>
</div>
  )
}

export default Editscategorie
