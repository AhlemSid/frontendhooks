
import React, { useState } from 'react'
import { useEffect } from 'react'



import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deletescategorie, fetchscategories } from '../../services/scategorieservice';
import Affichescategoriestable from './Affichescategoriestable';

const Listscategories = () => {
    const [scategories, setScategories] = useState([])
   

    useEffect(() => {
        listscategories()
    },) /*dependances*/

    const listscategories = async () => {
        try {
            await fetchscategories().then(res => setScategories(res.data))
        }
        catch (error) {
            console.log(error)
        }
    }

    const addproduct = (newproduit) => {
        setProducts([newproduit, ...products])
    }
    const deleteScategorie = (scategorieId, ref) => {

        confirmAlert({
            title: "Confirm delete...",
            message: " supprimer le sous-categorie: " + ref,
            buttons: [
                {
                    label: 'Oui',
                    onClick: () => deletescategorie(scategorieId)
                        .then(res =>
                            setProducts(scategories.filter((scategorie) => scategorie._id !==

                            scategorieId)))

                        //.then(console.log("suppression effectuée avec success"))
                        .catch(error => console.log(error))
                },
                {
                    label: 'Non',
                }
            ]
        });
    }

    const updateProduct = (prmod) => {
        setProducts(products.map((product) => product._id === prmod._id ? prmod :
            product));
    };
    return (
        <div>
            <Affichescategoriestable scategories={scategories} deleteScategorie={deleteScategorie} />

        </div>
    )
}
export default Listscategories