'use client'

import { useEffect, useState } from "react"

export default function Front(){
    const [itemName, setItemName] = useState("");

    const addItem = () => {
        fetch('/api',{
            method:"POST",
            body: JSON.stringify({itemName})
        })
    }
    return(
        <div>
            <input type="text" value={itemName} onChange={(event) => setItemName(event.target.value)}/>
            <button onClick={addItem}>Add Item</button>
        </div>
    );

}
