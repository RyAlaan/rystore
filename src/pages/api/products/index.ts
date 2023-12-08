// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createData, retrieveData } from "@/lib/firebase/service";
import { productType } from "@/types/productType";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  statusCode: number;
  data: productType[] | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.query;
  console.log(query);
  
  switch (req.method) {
    case "POST":
      await createData(
        "products",
        { data: req.body },
        ({
          statusCode,
          message,
          data,
        }: {
          statusCode: number;
          message: string;
          data: productType[] | null;
        }) => {
          res.status(statusCode).json({ statusCode, message, data });
        }
      );
      break;

    case "GET":
      await retrieveData(
        "products",
        ({
          statusCode,
          message,
          data,
        }: {
          statusCode: number;
          message: string;
          data: productType[] | null;
        }) => {
          res.status(statusCode).json({ statusCode, message, data });
        }
      );
      break;

    default:
      res
        .status(400)
        .json({ message: "Bad Request", statusCode: 400, data: null });
      break;
  }
}
