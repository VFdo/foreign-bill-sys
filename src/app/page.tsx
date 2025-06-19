'use client'

import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import VerticalTabs from "./components/ui/tabPage";
import SearchAppBar from "./components/ui/navigation";
import CartSummary from "./components/bill/cartSummary";

export default function Home(){
  return(
    <Container >
      <SearchAppBar />
      <VerticalTabs />
      <Box>
      {/* <IconButtonWithBadge itemCount={3}/> */}
    </Box>
    <Box>
    <CartSummary />
    </Box>
    </Container>    
  );
}