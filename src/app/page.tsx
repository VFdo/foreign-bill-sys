'use client'

import ItemGrid from "./components/item/dataTable";
import VerticalTabs from "./components/ui/tabPage";

export default function Both(){
  console.log("hello you!");
  return(
    <VerticalTabs />
    // <ItemGrid items={[]} />
  );
}