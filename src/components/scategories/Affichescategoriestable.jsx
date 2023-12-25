import React from 'react'
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box } from '@mui/material';
import Button from 'react-bootstrap/Button';

const Affichescategoriestable = ({ scategories,deleteScategorie }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'imagescategorie', //access nested data with dot notation
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
        accessorKey: 'nomscategorie',
        header: 'Nomscategorie',
        size: 150,
      },
      {
        accessorKey: '_id',
        header: 'actions',
        size: 100,
        Cell: ({ cell, row }) => (
        <div >
        <Button
        onClick={() => {
        console.log("modification ...")
        }}
        variant="warning"
        size="md"
        className="text-warning btn-link edit"
        >
        <i class="fa-solid fa-pen-to-square"></i>
        </Button>
        <Button
        onClick={(e) => {
        deleteScategorie(cell.row.original._id,cell.row.original.nomscategorie, e);
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
    [scategories],
  );

  const table = useMaterialReactTable({
    columns,
    data: scategories, //data must be memorized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return (
    <MaterialReactTable table={table} />
  )
}

export default Affichescategoriestable