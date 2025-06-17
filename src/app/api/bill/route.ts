import connect from "@/utils/startMongo"
import { ObjectId } from "mongodb";

const db = process.env.DATABASE;
if (!process.env.DATABASE) {
    throw new Error('Invalid/Missing environment variable: "DATABASE"');
  }
const collection = "bill";

export async function GET(){
    console.log("fetching bill documents...");
    const client = await connect
    const cursor = await client.db(`${db}`).collection(`${collection}`).find();
    const bills = await cursor.toArray()
    return Response.json(bills)
}

export async function POST(request: Request){
    console.log("inserting bill document...");
    const client = await connect;
    const body = await request.json();
    const cursor = await client.db(`${db}`).collection(`${collection}`).insertOne(
        {
            // TODO: add bill details
            // name:body.itemName, 
            // type:"type3", 
            // price:300.00

        });
    return Response.json({message: "successfully inserted the bill document"})
  }

  