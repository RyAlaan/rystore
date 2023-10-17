import {
  createData,
  deleteDataById,
  retrieveDataById,
  updateDataById,
} from "@/lib/firebase/service";
import { productType } from "@/types/productType";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  statusCode: number;
  data: productType | any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.query.product);
  switch (req.method) {
    case "GET":
      await retrieveDataById(
        "products",
        req.query.product as string,
        ({
          statusCode,
          message,
          data,
        }: {
          statusCode: number;
          message: string;
          data: { data: productType } | null;
        }) => {
          res.status(statusCode).json({ statusCode, message, data });
        }
      );
      break;

    case "PUT":
      await updateDataById(
        "products",
        req.query.product as string,
        req.body,
        ({
          statusCode,
          message,
          data,
        }: {
          statusCode: number;
          message: string;
          data: { data: productType } | null;
        }) => {
          res.status(statusCode).json({ statusCode, message, data });
        }
      );
      break;

    case "DELETE":
      await deleteDataById(
        "products",
        req.query.product as string,
        ({
          statusCode,
          message,
          data,
        }: {
          statusCode: number;
          message: string;
          data: { data: productType } | null;
        }) => {
          res.status(statusCode).json({ statusCode, message, data });
        }
      );
      break;

    default:
      res
        .status(405)
        .json({ message: "Method not allowed", statusCode: 405, data: null });
      break;
  }
}
