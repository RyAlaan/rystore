// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  deleteDataById,
  retrieveDataById,
  singUp,
  updateDataById,
} from "@/lib/firebase/service";
import { userType } from "@/types/userType";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  statusCode?: Number;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      await retrieveDataById(
        "users",
        req.query.user as string,
        ({
          statusCode,
          message,
          data,
        }: {
          statusCode: number;
          message: string;
          data: { data: userType } | null;
        }) => {
          res.status(statusCode).json({ statusCode, message, data });
        }
      );
      break;

    case "PUT":
      await updateDataById(
        "users",
        req.query.user as string,
        req.body,
        ({
          statusCode,
          message,
          data,
        }: {
          statusCode: number;
          message: string;
          data: { data: userType } | null;
        }) => {
          res.status(statusCode).json({ statusCode, message, data });
        }
      );
      break;

    case "DELETE":
      await deleteDataById(
        "users",
        req.query.user as string,
        ({
          statusCode,
          message,
          data,
        }: {
          statusCode: number;
          message: string;
          data: { data: userType } | null;
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
