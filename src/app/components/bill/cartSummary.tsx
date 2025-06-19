// /components/cart/CartSummary.tsx
import { useCartStore } from '@/app/store/cartstore';
import { Bill } from '@/app/types/bill';
import { Box, Button, Typography } from '@mui/material';
import SaveBillButton from './saveButton';

export default function CartSummary() {
  const items = useCartStore((state) => state.items);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
        <Box>
        <Typography variant="h6">Cart</Typography>
      <Typography>Items: {items.length}</Typography>
      <Typography>Total: Rs.{total.toFixed(2)}</Typography>
        </Box>
        <Box>
            <SaveBillButton patientId={"test"} />
        </Box>
      
    </Box>
  );
}

export async function createBillFromCart(patientId: string) {
    const { items } = useCartStore.getState();
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const clearCart = useCartStore((state) => state.clearCart);


    console.log("total:", total);

    const bill: Bill = {
      date: new Date(),
      items: items.map(({ quantity, ...rest }) => ({ ...rest, quantity })),
      total,
      patientId,
    };

    try{
        const res = await fetch('/api/bill', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bill),
          })
    
          if (!res.ok) {
            throw new Error('Failed to save bill');
          }
          console.log('saved bill:', bill)
          alert('Bill saved successfully');
        console.log(bill)
        clearCart();
    }catch (err) {
        console.error(err);
        alert('Error saving bill');
      }
    //   .then((data: Item[]) => setItems(data));

  }


//   const bill = createBillFromCart(patientId);
//   await fetch('/api/bills', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(bill),
//   });