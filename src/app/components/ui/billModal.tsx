import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Fab, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ItemsPage from '@/app/pages/item/page';
import { useCartStore } from '@/app/store/cartstore';
import { styled } from '@mui/material/styles';
import Badge, { badgeClasses } from '@mui/material/Badge';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from 'react';
import BillEditor from '@/app/pages/bill/page';

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
    top: -12px;
    right: -6px;
  }
`;

export default function BasicModalBill() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const items = useCartStore((state) => state.items);

  return (
    <div>
        <IconButton onClick={handleOpen}>
        <AddShoppingCartIcon fontSize="large" />
        <CartBadge badgeContent={items.length} color="secondary" overlap="rectangular" />
        </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Bill
          </Typography>
          <BillEditor />
        </Box>
      </Modal>
    </div>
  );
}
