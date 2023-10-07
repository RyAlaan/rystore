import {
  createData,
  deleteDataById,
  retrieveDataById,
} from "@/lib/firebase/service";
import { productType } from "@/types/productType";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  statusCode: number;
  data?: productType | any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.query.product);
  switch (req.method) {

    case "GET":
      const data = await retrieveDataById(
        "products",
        req.query.product as string
      );
      if (data) {
        res.status(200).json({ message: "Data found", statusCode: 200, data });
      } else {
        res
          .status(404)
          .json({ message: "Data not found", statusCode: 404, data: null });
      }
      break;

    case "PUT":
      break;

    case "DELETE":
      await deleteDataById("products", req.query.product as string);
      res
        .status(200)
        .json({ message: "Data deleted successfully", statusCode: 200 });
      break;

    default:
      res.status(405).json({ message: "Method not allowed", statusCode: 405 });
      break;
  }
}
