// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deleteDataById, retrieveDataById, singUp } from "@/lib/firebase/service";
import { userType } from "@/types/userType";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  statusCode?: Number;
  status? :boolean;
  data?: userType[] | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      await singUp(
      req.body,
      ({ status, message }: { status: boolean; message: string }) => {
        res.status(status ? 200 : 400).json({status, message})
      }
    );
    break;

    case "GET":
      const data = (await retrieveDataById(
        "users",
        req.query.user as string
      )) as userType[] | null;
      if (data) {
        res.status(200).json({ message: "Data found", statusCode: 200, data });
      } else {
        res
          .status(404)
          .json({ message: "Data not found", statusCode: 404, data: null });
      }
      break;

    case "PUT":
      // await updateDataById("users", req.query.user as string, req.body);
      break;

    case "DELETE":
      await deleteDataById("users", req.query.user as string);
      res.status(200).json({ message: "Data deleted successfully", statusCode: 200 });
      break;

    default:
      break;
  }
}
