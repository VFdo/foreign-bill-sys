import { Item } from "@/app/types/item";
import { Box, Grid, TextField, Button } from "@mui/material";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

  function ItemsPage() {
    const [item, setItem] = useState<Item>({
        _id: '',
        name: '',
        type: '',
        price: 0,
        quantity: 0
    });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setItem({
          ...item,
          [name]: ["price"].includes(name)
            ? Number(value)
              : value,
        });
      };

    const router = useRouter();

  const handleSubmit = (newItem: Item) => {
      console.log("item to save: ", newItem);
      fetch('/api/item', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem),
        }) 
        .then(async (res) => {
          if (!res.ok) {
            const errorData = await res.json();
            console.error("Save error:", errorData);
            alert(errorData.message || "An error occurred while saving the item.");
          }
        })
        .then((data) => {
          console.log("Item saved:", data);
          alert("Item added successfully!");
          // router.refresh();
          window.location.reload();
        })
        .catch((err) => {
          console.error("Save error:", err);
          alert("Failed to save item.");
        });
      }
  return(
    <Box>
        <>
          <Grid container spacing={2} justifyContent="center">
                <Grid size={8}>
                    <TextField label="Item Name" name="name" value={item.name} onChange={handleInputChange} fullWidth focused />
                </Grid>
                <Grid size={8}>
                    <TextField label="Type" name="type" value={item.type} onChange={handleInputChange} fullWidth />
                </Grid>
                <Grid size={8}>
                    <TextField label="Unit Price" name="price" value={item.price} onChange={handleInputChange} fullWidth />
                </Grid>
                <Grid size={8}>
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmit(item)}
                    sx={{ width: 200, height:50}}
                >
                    Add Item
                </Button>
                </Grid>
            </Grid>
        </>
    </Box>
  );
  }

  export default ItemsPage;