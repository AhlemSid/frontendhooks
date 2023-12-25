
import React, { useState } from 'react'
import { useEffect } from 'react'

import Affichearticlestable from './Affichearticlestable'
import { addarticle, deletearticle, editarticle, fetcharticles, } from '../../services/articleservice'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import Insertarticle from './Insertarticle';
import ReactLoading from 'react-loading';





const Listarticles = () => {
    const [products, setProducts] = useState([])
    const [isLoading,setIsloading]= useState(true)
   
    
   

    useEffect(() => {
        listproduits()
    },[]) /*dependances*/

    const listproduits = async () => {
        try {
            await fetcharticles().then(res => {setProducts(res.data)
            setIsloading(false)
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    const addproduct = async (newproduit) => {
        await addarticle(newproduit).then(res=>{setProducts([res.data, ...products])
        })
      };
    
    const deleteProduct = (productId, ref) => {

        confirmAlert({
            title: "Confirm delete...",
            message: " supprimer l' article: " + ref,
            buttons: [
                {
                    label: 'Oui',
                    onClick: () => deletearticle(productId)
                        .then(res =>
                            setProducts(products.filter((product) => product._id !==

                                productId)))

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
        editarticle(prmod).then(res=>{ 
            setProducts(products.map((product) => product._id === prmod._id ? prmod :
            product));})
       
    };
    if (isLoading) return<center><ReactLoading type='spokes' color='red' height={'8%'}/></center>
    return (
        <div>
            <Insertarticle addproduct={addproduct} />
            <Affichearticlestable products={products} deleteProduct={deleteProduct} updateProduct={updateProduct} />

        </div>
    )
}
export default Listarticles