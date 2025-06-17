'use client'

import { useState } from "react"
import { Item } from "../../types/item";

type EditProps = {
    item:Item
}

const EditItem = ({item}: EditProps) => {
    const [itemName, setItemName] = useState("");

    const updateItem = () => {
        fetch(`/api/items/${item._id}`,{
            method: "PUT",
            body: JSON.stringify({ itemName })
        })
    }
    return(
        <div key={item._id.toString()}>
            <h1> {item.name} </h1>
            <input 
                value={itemName}
                onChange={(e)=>setItemName(e.target.value)}
            ></input>
            <button onClick={updateItem}>Update Name</button>
        </div>        
    );
}

export default EditItem