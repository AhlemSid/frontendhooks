import React from 'react'
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box } from '@mui/material';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import Editcategorie from './Editcategorie';

const Affichecategoriestable = ({ categories,deleteCategorie,updateCategorie }) => {
  const [show, setShow] = useState("");
  const [cat, setCat] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const modifCat = (value) => {
    handleShow()
    setCat(value)
  }


  const columns = useMemo(
    () => [
      {
        accessorKey: 'imagecategorie', //access nested data with dot notation
        header: 'Image',
        Cell: ({ cell }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <img
              alt=""
              height={100}
              src={cell.getValue()}
              loading="lazy"
              style={{ borderRadius: '20%' }}
            />

          </Box>),
      },
      {
        accessorKey: 'nomcategorie',
        header: 'Nomcategorie',
        size: 150,
      },
      
     
     
      {
        accessorKey: '_id',
        header: 'actions',
        size: 100,
        Cell: ({ cell, row }) => (
        <div >
        <Button
              variant="warning"
              size="md"
              style={{ float: 'left' }}
              className="text-warning btn-link edit"
              onClick={() => { modifCat(cell.row.original) }}>

              <i className="fa-solid fa-pen-to-square"></i>
            </Button>
        <Button
        onClick={(e) => {
        deleteCategorie(cell.row.original._id,cell.row.original.nomcategorie, e);
        }}
        variant="danger"
        size="md"
        className="text-danger btn-link delete"
        >
        <i className="fa fa-trash" />
        </Button>
</div>
),
},
    ],
    [categories],
  );

  const table = useMaterialReactTable({
    columns,
    data: categories, //data must be memorized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return (
    <div>
      {show && <Editcategorie
        show={show}
        handleClose={handleClose}
        cat={cat}
        updateCategorie={updateCategorie}
      />}
      
      
          <MaterialReactTable table={table} />
        
    </div>
  )
}

export default Affichecategoriestable