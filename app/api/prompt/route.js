import { connectToDatabase } from "../../../utils/database";
import Prompt from "../../../models/Prompt";

export const GET = async (req, res) => {
  try {
    await connectToDatabase();
    const prompts = await Prompt.find({}).populate("creator").exec();
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};




