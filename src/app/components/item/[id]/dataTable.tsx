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
        setBillList: React.Dispatch<React.SetStateAction<string[]>>;
    }

    export default function ItemGrid({items, setBillList} : GridProps) {
        const addItem = useCartStore((state) => state.addItem);

        const columns: GridColDef<Item>[] = [
            // TODO: try to hide ID
            { 
                field: '_id', 
                headerName: 'Item ID', 
                flex: 1 
            },
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
                  const handleClick = () => {
                    if (isInCart) {
                      removeItem(item._id);
                    } else {
                      addItem(item);
                    }
                  };
              
                  return (
                    <Button
                      variant={isInCart ? 'outlined' : 'contained'}
                      color={isInCart ? 'secondary' : 'primary'}
                      onClick={handleClick}
                    >
                      {isInCart ? 'Remove' : 'Add to Bill'}
                    </Button>
                  );
                }
              }
        ];

    
    return (
        <Box sx={{ height: 400, width: '100%' }}>
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
            // checkboxSelection
            disableRowSelectionOnClick
            // onRowSelectionModelChange={(newSelection) => {
            //     setRowSelectionModel(newSelection);
            //   }}
            //   rowSelectionModel={selectedItemList}
            //   {...items}
        
        />
      </Box>
    );
}
