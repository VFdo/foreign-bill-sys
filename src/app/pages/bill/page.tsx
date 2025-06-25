'use client';

import { useCartStore } from '@/app/store/cartstore';
import { TextField, Typography, Box, Button, Divider, IconButton } from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';


export default function BillEditor() {
  const { items, increaseQty, decreaseQty, clearCart, removeItem } = useCartStore();
  const [patientId, setPatientId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); 

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const router = useRouter();

  type patient = {
    phn: string
    name: string
    phone: string
    address: string

  }

    const [patient, setPatient] = useState<patient>({
        phn: '',
        name: '',
        phone: '',
        address: ''
    });

    const [loading, setLoading] = useState(false)

  const handleSave = () => {
    
    const bill = {
      _id: '',
      date: new Date(date),
      items,
      total,
      patientId,
    };
    console.log("bill to save: ", bill);

    Promise.all([
        fetch('/api/bill'),
        // fetch(`${baseURL}/getPatientBySN/${sn}`),
        
      ])
      fetch(`http://172.16.0.212:8000/api/adt/patientSearch?phn=${patientId}`)
    .then(async (res) => {
        if(res.ok){
            console.log("found in phn search");
                const data = await res.json();
                const phnData = data.data[0];
                setPatient({
                    phn: phnData.phn,
                    name: phnData.patientName,
                    phone: phnData.patientMobile01,
                    address: phnData.patientAddress
                });
                setLoading(false);
                console.log("PHN API data:", patient);
                alert("found");
                // router.push()
            }
        // } if(res2.ok){
        //     const data2 = await res2.json();
        //     window.print();
        //     clearCart();
        //     console.log("Bill saved:", data2);
        //     alert("Bill added successfully!");
        //     router.refresh();
        // } if(!res1.ok){
        //     alert("Patient not found!");
        // }
        // else {
        //     alert("Bill cannot be saved!");
        // }
      })
      .catch((err) => {
        console.error("Save error:", err);
        alert("Failed to save bill.");
      });
  };

//   const handlePrint = () => 

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      {/* <Typography variant="h4" gutterBottom>New Bill</Typography> */}

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          fullWidth
        />
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {items.length === 0 ? (
        <Typography>No items in bill.</Typography>
      ) : (
        <Box>
          {items.map((item) => (
            <Box
              key={item._id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
              }}
            >
              <Box>
                <Typography>{item.name}</Typography>
                <Typography variant="body2">Unit Price: ${item.price}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button onClick={() => decreaseQty(item._id)}>-</Button>
                <Typography>{item.quantity}</Typography>
                <Button onClick={() => increaseQty(item._id)}>+</Button>
              </Box>
              <Typography>Rs.{(item.price * item.quantity).toFixed(2)}</Typography>
              <IconButton onClick={() => removeItem(item._id)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">Rs.{total.toFixed(2)}</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            {/* <Button variant="outlined" onClick={handlePrint}>Print</Button> */}
            <Button variant="contained" onClick={handleSave} disabled={!patientId}>
            Print
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
