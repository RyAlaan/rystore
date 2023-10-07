// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createData, retrieveData } from "@/lib/firebase/service";
import { productType } from "@/types/productType";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  statusCode: number;
  data?: productType[] | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      await createData("products", { data: req.body }); 
      res.status(200).json({ message: "Data created successfully", statusCode: 200 });
      break;

    case "GET":
      const data = (await retrieveData("products")) as productType[] | null;
      if (data) {
        res
          .status(200)
          .json({ message: "Data found successfuly", statusCode: 200, data });
      } else {
        res
          .status(404)
          .json({ message: "Data not found", statusCode: 404, data: null });
      }
      break;

    default:
      break;
  }
}
