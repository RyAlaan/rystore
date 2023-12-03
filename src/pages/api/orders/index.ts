// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createData, retrieveData, singUp } from "@/lib/firebase/service";
import { orderType } from "@/types/orderType";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  statusCode: number;
  data: { data: orderType } | null | orderType[];
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
          data: orderType[] | null;
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
        .status(500)
        .json({ message: "Method not allowed", statusCode: 500, data: null });
      break;
  }
}
