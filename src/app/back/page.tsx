import EditItem from "../components/item/editItem";
import { Item } from "../types/item";


export default async function Back(){
    const baseURL = process.env.BASE_URL
    if (!process.env.BASE_URL) {
        throw new Error('Invalid/Missing environment variable: "BASE_URL"');
      }
    const response = await fetch(`${baseURL}/api/items`)
    const items: Item[] = await response.json()
    return(
        <div>
            {items.map(item => 
                <EditItem item={item} key={item._id.toString()}/>
            )}
        </div>
    )
}
