'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Item } from '@/app/types/item';
import { useEffect, useState } from 'react';

const columns: GridColDef<Item>[] = [
    // TODO: try to hide ID
    { 
        field: '_id', 
        headerName: 'Item ID', 
        width: 90, 
    },
    { 
        field: 'name', 
        headerName: 'Item Name', 
        width: 90 
    },
    {
        field: 'price',
        headerName: 'Price',
        width: 150,
        editable: true,
    },
//   {
//     field: 'lastName',
//     headerName: 'Last name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 110,
//     editable: true,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//   },
];
    

    const rows = [
    { _id:1, name:'test', price:100 },
    { _id:2, name:'test2', price:200 },
    ];

    type GridProps = {
        items: Item[]
    }

    export default function ItemGrid({items} : GridProps) {
        const [itemList, setItemList] = useState<Item[]>([]);
        useEffect(() => {
            fetch('api/items/', {
                method:"GET"
            })
            .then(res => res.json())
            .then((data: Item[]) => setItemList(data))
        }, []);
    return (
        <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={itemList}
            getRowId={(row) => row._id}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: {
                pageSize: 5,
                },
            },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            // disableRowSelectionOnClick
        />
        </Box>
    );
}
