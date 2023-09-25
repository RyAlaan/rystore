// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveData, retrieveDataById } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  statusCode: Number;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {  
  if (req.query.userId![1]) {
    const data = await retrieveDataById("users", req.query.userId![1]);
    res.status(200).json({ status: true, statusCode: 200, data });
  }
  const data = await retrieveData("users");
  res.status(200).json({ status: true, statusCode: 200, data });
}
