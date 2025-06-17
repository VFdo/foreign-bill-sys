import connect from "@/utils/startMongo"
import { ObjectId } from "mongodb";

const db = process.env.DATABASE;
if (!process.env.DATABASE) {
    throw new Error('Invalid/Missing environment variable: "DATABASE"');
  }
const collection = "item";

export async function GET(){
    const client = await connect
    const cursor = await client.db(`${db}`).collection(`${collection}`).find();
    const items = await cursor.toArray()
    return Response.json(items)
}

export async function POST(request: Request){
    const client = await connect;
    const body = await request.json();
    const cursor = await client.db(`${db}`).collection(`${collection}`).insertOne(
        {
            name:body.itemName, 
            type:"type3", 
            price:300.00

        });
    return Response.json({message: "successfully inserted the document"})
  }

//   export async function PUT(request: Request){
//     const client = await connect;
//     const body = await request.json();
//     const id = new ObjectId(body.id);
//     await client.db(`${db}`).collection(`${collection}`).updateOne(
//         {_id: id}, 
//         {
//             $set: {
//             name: body.itemName,
//             type: "type4",
//             price: 400.00,
//             },
//         }
//     );
//     return Response.json({message: "successfully updated the document"})
//   }