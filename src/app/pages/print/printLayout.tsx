'use client';
import { Item } from '@/app/types/item';
import { Box, Typography } from '@mui/material';

type PrintableBillProps = {
  patientName: string;
  patientId: string;
  address: string;
  date: string;
  items: (Item[]);
  total: number;
};

export default function PrintableBill({
  patientName,
  patientId,
  address,
  date,
  items,
  total,
}: PrintableBillProps) {
  return (
    <Box 
    id="print-section" 
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      minHeight: '100vh',
      p: 0,
      m: 0,
      backgroundColor: 'white',
      color: 'black',
    }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <img src="/letterhead.jpg" alt="Letterhead" style={{ width: '100%' }} />
      </Box>

      <Typography variant="h6">Patient PHN: {patientId}</Typography>
      <Typography variant="body1">Date: {date}</Typography>
      <Typography variant="body1">Patient Name: {patientName}</Typography>
      <Typography variant="body1">Address: {address}</Typography>

      <Box sx={{ mt: 4 }}>
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 1,
              borderBottom: '1px solid #ccc',
              pb: 1,
            }}
          >
            <Typography>{item.name}</Typography>
            <Typography>{item.quantity} × Rs.{item.price}</Typography>
            <Typography>Rs.{(item.quantity * item.price).toFixed(2)}</Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 4, textAlign: 'right' }}>
        <Typography variant="h6">Total: Rs.{total.toFixed(2)}</Typography>
      </Box>
    </Box>
  );
}
