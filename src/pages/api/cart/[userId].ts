// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  createData,
  deleteDataById,
  getCartData,
  retrieveData,
  updateDataById,
} from "@/lib/firebase/service";
import { cartType } from "@/types/cartType";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  statusCode: number;
  data: { data: cartType } | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "PUT":
      await updateDataById(
        "cart",
        req.query.userId as string,
        req.body,
        ({
          statusCode,
          message,
          data,
        }: {
          statusCode: number;
          message: string;
          data: { data: cartType } | null;
        }) => {
          res.status(statusCode).json({ statusCode, message, data });
        }
      );
      break;

    case "GET":
      await getCartData(
        req.query.userId as string,
        ({
          statusCode,
          message,
          data,
        }: {
          statusCode: number;
          message: string;
          data: { data: cartType } | null;
        }) => {
          res.status(statusCode).json({ statusCode, message, data });
        }
      );
      break;

    case "DELETE":
      await deleteDataById(
        "cart",
        req.query.userId as string,
        ({
          statusCode,
          message,
          data,
        }: {
          statusCode: number;
          message: string;
          data: { data: cartType } | null;
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
