// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createData, retrieveData } from "@/lib/firebase/service";
import { orderType } from "@/types/orderTypes";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  statusCode: number;
  data: orderType[] | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      await createData(
        "orders",
        { data: req.body },
        ({
          statusCode,
          message,
          data,
        }: {
          statusCode: number;
          message: string;
          data: orderType[];
        }) => {
          res.status(statusCode).json({ statusCode, message, data });
        }
      );
      break;

    case "GET":
      await retrieveData(
        "orders",
        ({
          statusCode,
          message,
          data,
        }: {
          statusCode: number;
          message: string;
          data: orderType[] | null;
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
