import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/database";
import Prompt from "@/models/Prompt";

 async function handler(req, res) {
    console.log(req.method, req.body,req.params);
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
      const buffers = [];
      for await (const chunk of req.body) {
        buffers.push(chunk);
      }
      const data = Buffer.concat(buffers).toString();
      const { prompt, tag, userId } = JSON.parse(data);
    if (!prompt || !tag || !userId) {
      return new Response("Prompt, tag and userId are required", { status: 400 });
    }

    await connectToDatabase();
    const newPrompt = new Prompt({ prompt, tag, userId });
    await newPrompt.save();
    return new Response(newPrompt, { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};


export {
    handler as POST
    
}