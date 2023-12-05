// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  deleteDataById,
  getOrderData,
  updateDataById,
} from "@/lib/firebase/service";
import { orderType } from "@/types/orderType";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  statusCode: number;
  data: { data: orderType } | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "PUT":
      await updateDataById(
        "orders",
        req.query.orderId as string,
        req.body,
        ({
          statusCode,
          message,
          data,
        }: {
          statusCode: number;
          message: string;
          data: { data: orderType } | null;
        }) => {
          res.status(statusCode).json({ statusCode, message, data });
        }
      );
      break;

    case "GET":
      await getOrderData(
        req.query.orderId as string,
        ({
          statusCode,
          message,
          data,
        }: {
          statusCode: number;
          message: string;
          data: { data: orderType } | null;
        }) => {
          res.status(statusCode).json({ statusCode, message, data });
        }
      );
      break;

    case "DELETE":
      await deleteDataById(
        "prders",
        req.query.orderId as string,
        ({
          statusCode,
          message,
          data,
        }: {
          statusCode: number;
          message: string;
          data: { data: orderType } | null;
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
