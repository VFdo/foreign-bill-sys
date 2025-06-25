import connect from "@/utils/startMongo"
import { ObjectId } from "mongodb";

const db = process.env.DATABASE;
if (!process.env.DATABASE) {
    throw new Error('Invalid/Missing environment variable: "DATABASE"');
  }
const collection = "item";

export async function GET({ params }: {params: { id: string }}){
  const client = await connect
  const cursor = await client.db(`${db}`).collection(`${collection}`).find(); //TODO: fix
  const id = new ObjectId(params.id);
  const items = await cursor.toArray()
  return Response.json(items)
}

export async function PUT(request: Request, { params }: {params: { id: string }}){
    const client = await connect;
    const body = await request.json();
    const id = new ObjectId(params.id);
    await client.db(`${db}`).collection(`${collection}`).updateOne(
        {_id: id}, 
        {
            $set: {
            name: body.itemName,
            type: "type4",
            price: 400.00,
            },
        }
    );
    return Response.json({message: "successfully updated the document"})
  }