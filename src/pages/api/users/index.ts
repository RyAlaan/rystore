// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveData } from "@/lib/firebase/service";
import { userType } from "@/types/userType";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  statusCode: number;
  data: userType[] | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = (await retrieveData("users")) as userType[] | null;
  if (data) {
    res.status(200).json({ message: "Data found successfuly", statusCode: 200, data });
  } else {
    res.status(404).json({ message: "Data not found", statusCode: 404, data: null });
  }
}
