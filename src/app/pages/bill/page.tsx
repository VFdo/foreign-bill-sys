'use client';

import { useCartStore } from '@/app/store/cartstore';
import { TextField, Typography, Box, Button, Divider, IconButton } from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';


type patient = {
  phn: string
  name: string
  phone: string
  address: string
  date: Date
}
interface ChildProps {
  setPatient: React.Dispatch<React.SetStateAction<patient>>;
}

const uri = process.env.NEXT_PUBLIC_PHNURL;

if (!uri) {
  throw new Error('Missing PHNURL');
}

export default function BillEditor({setPatient} : ChildProps) {
  const { items, increaseQty, decreaseQty, clearCart, removeItem } = useCartStore();
  const [patientId, setPatientId] = useState('');
  const [billDate, setDate] = useState(new Date().toISOString().slice(0, 10)); 

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const router = useRouter();

    const [loading, setLoading] = useState(false)
    const [showPrintLayout, setShowPrintLayout] = useState(false);

   


  const handleSave = async () => {
    const bill = {
      _id: '',
      date: new Date(billDate),
      items,
      total,
      patientId,
    };
  
    try {
      const res = await fetch(`${uri}${patientId}`);
      if (!res.ok) throw new Error("Patient not found");
  
      const data = await res.json();
      const phnData = data.data[0];
      const patientData = {
        phn: phnData.phn,
        name: phnData.patientName,
        phone: phnData.patientMobile01,
        address: phnData.patientAddress,
        date: new Date(billDate)
      };
      setPatient(patientData);
  
      const saveRes = await fetch('/api/bill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bill),
      });
  
      if (!saveRes.ok) throw new Error("Failed to save bill");
  
      alert('Bill saved successfully');

      setShowPrintLayout(true);
      window.print();
      clearCart();
      window.location.reload();
  
    } catch (err) {
      console.error("Save error:", err);
      alert(err || "An error occurred.");
    }
  };
  
  return (
    <>
    <Box>
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>

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
          value={billDate}
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
                <Typography variant="body2">Unit Price: Rs.{item.price}</Typography>
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
    </Box>
      </>
  );
}
