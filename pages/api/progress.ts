import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, as we will handle it manually
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    try {
      return res.status(200).json({ error: "Success handling file upload" });
    } catch (error) {
      console.error("Error handling file upload", error);
      return res.status(500).json({ error: "Error handling file upload" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
