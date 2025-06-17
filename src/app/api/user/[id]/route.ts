import connect from "@/utils/startMongo"
import { ObjectId } from "mongodb";

const db = process.env.DATABASE;
if (!process.env.DATABASE) {
    throw new Error('Invalid/Missing environment variable: "DATABASE"');
  }
const collection = "user";

export async function PUT(request: Request){
    console.log("updating user document...");
    const client = await connect;
    const body = await request.json();
    const id = new ObjectId(body.id);
    await client.db(`${db}`).collection(`${collection}`).updateOne(
        {_id: id}, 
        {
            // TODO:add user data
            // $set: {
            // name: body.itemName,
            // type: "type4",
            // price: 400.00,
            // },
        }
    );
    return Response.json({message: "successfully updated the user document"})
  }