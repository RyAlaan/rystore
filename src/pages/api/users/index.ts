// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveData, singUp } from "@/lib/firebase/service";
import { userType } from "@/types/userType";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  statusCode: number;
  data : {data: userType} | null | userType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      await singUp(
        req.body,
        ({
          statusCode,
          message,
          data,
        }: {
          statusCode: number;
          message: string;
          data: {data :userType} | null;
        }) => {
          res
            .status(statusCode)
            .json({ statusCode, message, data });
        }
      );
      break;

    case "GET":
      await retrieveData(
        "users",
        ({
          statusCode,
          message,
          data,
        }: {
          statusCode: number;
          message: string;
          data: userType[] | null;
        }) => {
          res.status(statusCode).json({ statusCode, message, data });
        }
      );
      break;

    default:
      res.status(500).json({ message: "Method not allowed", statusCode: 500, data: null });
      break;
  }
}
