import { useCartStore } from "@/app/store/cartstore";
import { Button } from "@mui/material";
import { createBillFromCart } from "./cartSummary";

export default function SaveBillButton({ patientId }: { patientId: string }) {
    const clearCart = useCartStore((state) => state.clearCart);
  
    const handleClick = async () => {
      try {
        const bill = await createBillFromCart(patientId);
  
        const res = await fetch('/api/bills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bill),
        });
  
        if (!res.ok) {
          throw new Error('Failed to save bill');
        }
        alert('Bill saved successfully');
        console.log(bill)
        clearCart();
      } catch (err) {
        console.error(err);
        alert('Error saving bill');
      }
    };
  
    return (
      <Button variant="contained" color="primary" onClick={handleClick}>
        Save Bill
      </Button>
    );
  }