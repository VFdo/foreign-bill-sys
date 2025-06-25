'use client'

import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import VerticalTabs from "./components/ui/tabPage";
import SearchAppBar from "./components/ui/navigation";
import CartSummary from "./components/bill/cartSummary";
import BasicModal from "./components/ui/addItemModal";

export default function Home(){
  return(
    // <Container >
    <div>
      <SearchAppBar />
      <VerticalTabs />
      {/* <BasicModal /> */}
      
    </div>
    //   <Box>
    //   {/* <IconButtonWithBadge itemCount={3}/> */}
    // </Box>
    // <Box>
    
    // </Box>
    // </Container>    
  );
}