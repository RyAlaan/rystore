// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createData, retrieveData } from "@/lib/firebase/service";
import { orderDetailType } from "@/types/orderDetailType";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  statusCode: number;
  data: orderDetailType[] | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      await createData(
        "orderDetails",
        { data: req.body },
        ({
          statusCode,
          message,
          data,
        }: {
          statusCode: number;
          message: string;
          data: orderDetailType[];
        }) => {
          res.status(statusCode).json({ statusCode, message, data });
        }
      );
      break;

    case "GET":
      await retrieveData(
        "orderDetails",
        ({
          statusCode,
          message,
          data,
        }: {
          statusCode: number;
          message: string;
          data: orderDetailType[] | null;
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
