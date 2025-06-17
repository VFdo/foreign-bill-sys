import connect from "@/utils/startMongo"
import { ObjectId } from "mongodb";

const db = process.env.DATABASE;
if (!process.env.DATABASE) {
    throw new Error('Invalid/Missing environment variable: "DATABASE"');
  }
const collection = "user";

export async function GET(){
    console.log("fetching user documents...");
    const client = await connect
    const cursor = await client.db(`${db}`).collection(`${collection}`).find();
    const users = await cursor.toArray()
    return Response.json(users)
}

export async function POST(request: Request){
    console.log("inserting user document...");
    const client = await connect;
    const body = await request.json();
    const cursor = await client.db(`${db}`).collection(`${collection}`).insertOne(
        {
            // TODO: add user details
            // name:body.itemName, 
            // type:"type3", 
            // price:300.00

        });
    return Response.json({message: "successfully inserted the user document"})
  }

  