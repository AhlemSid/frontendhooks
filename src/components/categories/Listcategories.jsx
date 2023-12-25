
import React, { useState } from 'react'
import { useEffect } from 'react'



import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deletecategorie, editcategorie, fetchcategories } from '../../services/categorieservice';
import Affichecategoriestable from './Affichecategoriestable';
import ReactLoading from 'react-loading';
import Insertcategorie from './Insertcategorie';


const Listcategories = () => {
    const [categories, setCtegories] = useState([])
    const [isLoading,setIsloading]= useState(true)
   

    useEffect(() => {
        Listcategories()
    },) /*dependances*/

    const Listcategories = async () => {
        try {
            await fetchcategories().then(res => {setCtegories(res.data)
                setIsloading(false)
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    const addcategorie = async (newcategorie) => {
        await addcategorie(newcategorie).then(res=>{setCtegories([res.data, ...categories])
        })
      };
    const deleteCategorie = (categorieId, ref) => {

        confirmAlert({
            title: "Confirm delete...",
            message: " supprimer le categorie: " + ref,
            buttons: [
                {
                    label: 'Oui',
                    onClick: () => deletecategorie(categorieId)
                        .then(res =>
                            setCtegories(categories.filter((categorie) => categorie._id !==

                            categorieId)))

                        //.then(console.log("suppression effectuée avec success"))
                        .catch(error => console.log(error))
                },
                {
                    label: 'Non',
                }
            ]
        });
    }

    const updateCategorie = (prmod) => {
        editcategorie(prmod).then(res=>{ 
            setCtegories(categories.map((categorie) => categorie._id === prmod._id ? prmod :
            categorie));})
       
    };
    if (isLoading) return<center><ReactLoading type='spokes' color='red' height={'8%'}/></center>
    return (
        <div>
            <Insertcategorie addcategorie={addcategorie} />
            <Affichecategoriestable categories={categories} deleteCategorie={deleteCategorie} updateCategorie={updateCategorie} />

        </div>
    )
}
export default Listcategories