import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, Fab, IconButton } from '@mui/material';
import { useCartStore } from '@/app/store/cartstore';
import { styled } from '@mui/material/styles';
import Badge, { badgeClasses } from '@mui/material/Badge';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from 'react';
import BillEditor from '@/app/pages/bill/page';
import PrintableBill from '@/app/pages/print/printLayout';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -5px;
    right: -90px;
  }
`;

export default function BasicModalBill() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const items = useCartStore((state) => state.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);


  type patient = {
    phn: string
    name: string
    phone: string
    address: string
    date: Date
  }
  const [patient, setPatient] = useState<patient>({
      phn: '',
      name: '',
      phone: '',
      address: '',
      date: new Date()
  });

  return (
    <div>
        {/* <IconButton onClick={handleOpen}>
        <AddShoppingCartIcon fontSize="large" />
        <CartBadge badgeContent={items.length} color="secondary" overlap="rectangular" />
        </IconButton> */}

      <Button
                variant="contained"
                color="secondary"
                startIcon={
                <><AddShoppingCartIcon fontSize="large" /><CartBadge badgeContent={items.length} color="secondary" overlap="rectangular" /></>
              }
                onClick={handleOpen}
                sx={{
                  backgroundColor: '#E5E4E2',
                  color: '#000', 
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 2,
                  py: 1,
                  boxShadow: 1,
                  '&:hover': {
                    backgroundColor: '#FFFFFF',
                    boxShadow: 3
                }
              }}
              >
        Create Bill
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box 
        sx={style}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Bill
          </Typography>
          <BillEditor setPatient={setPatient} />
        </Box>
      </Modal>
      <Box
    id="print-section"
    sx={{
      display: 'none',
      '@media print': {
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'white',
        color: 'black',
        p: 0,
        m: 0,
      },
    }}
  >
      <PrintableBill
          patientName={patient.name}
          patientId={patient.phn}
          date={patient.date.toISOString().slice(0, 10)}
          items={items}
          total={total} 
          address={patient.address}        
          />
      </Box>
    </div>
  );
}
