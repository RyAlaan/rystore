// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { singUp, update } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";

type Data = {
  status: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    await singUp(
      req.body,
      ({ status, message }: { status: boolean; message: string }) => {
        res.status(status ? 200 : 400).json({status, message})
      }
    );
  } if (req.method === "PUT") {
    await update(
      req.body,
      ({ status, message }: { status: boolean; message: string }) => {
        res.status(status ? 200 : 400).json({status, message})
      }
    )
  }
  else {
    res.status(405).json({status : false, message : "method not allowed"})
  }
}
