'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { Item } from '@/app/types/item';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useCartStore } from '@/app/store/cartstore';

    type GridProps = {
        items: Item[],
    }

    export default function ItemGrid({items} : GridProps) {
        // const addItem = useCartStore((state) => state.addItem);

        const columns: GridColDef<Item>[] = [
            // { 
            //     field: '_id', 
            //     headerName: 'Item ID', 
            //     flex: 1 
            // },
            { 
                field: 'name', 
                headerName: 'Item Name', 
                flex: 1 
            },
            {
                field: 'price',
                headerName: 'Price',
                flex: 1, 
                editable: true,
            },
            {
                field: 'action',
                headerName: 'Action',
                flex: 1,
                renderCell: (params) => {
                  const item = params.row;
                  const cartItems = useCartStore.getState().items;
                  const isInCart = cartItems.some((i) => i._id === item._id);
                  const addItem = useCartStore.getState().addItem;
                  const removeItem = useCartStore.getState().removeItem;
                  const [label, setLabel] = useState(isInCart ? 'Remove' : 'Add to Bill')
                  const handleClick = () => {
                    if (isInCart) {
                      removeItem(item._id);
                      setLabel('Add to Bill')
                    } else {
                      addItem(item);
                      setLabel('Remove')
                    }
                  };
              
                  return (
                    <Button
                      variant={isInCart ? 'outlined' : 'contained'}
                      color={isInCart ? 'secondary' : 'primary'}
                      onClick={handleClick}
                    >
                      {label}
                    </Button>
                  );
                }
              }
        ];

    
    return (
        <Box sx={{ height: '100%', width: '100%' }}>
        <DataGrid
            rows={items}
            getRowId={(row) => row._id}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: {
                pageSize: 10,
                },
            },
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
        />
      </Box>
    );
}
