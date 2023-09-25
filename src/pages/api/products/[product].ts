import { retrieveDataById } from "@/lib/firebase/service";
import { productType } from "@/types/productType";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  statusCode: number;
  data: productType | any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = await retrieveDataById("products", req.query.product as string);
  res.status(200).json({ status: true, statusCode: 200, data });
}
