import { NextApiRequest, NextApiResponse } from "next";
import multiparty from "multiparty";
import { uploadImage } from "@/lib/firebase/service";

interface FileObject {
  fieldName: string;
  originalFilename: string;
  path: string;
  headers: {
    "content-disposition": string;
    "content-type": string;
  };
  size: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const form = new multiparty.Form();

      form.parse(req, async (err: any, fields: any, files: any) => {
        if (err) {
          res
            .status(400)
            .json({ message: "Invalid request", statusCode: 400, data: err });
          return;
        }


        const fileFieldNames = Object.keys(files);


        if (fileFieldNames.length > 0) {
          try {
            const uploadFile: FileObject[] = [];

            for (const key in files) {
              if (files.hasOwnProperty(key)) {
                const fileArray = files[key];
                for (const file of fileArray) {
                  uploadFile.push(file);
                }
              }
            }


            const uploadImageName: string[] = [];

            for (const key in fields) {
              if (fields.hasOwnProperty(key) && key !== "folder") {
                const values = fields[key];
                uploadImageName.push(...values);
              }
            }


            const result = await uploadImage(
              fields.folder,
              uploadImageName,
              uploadFile,
              ({
                statusCode,
                message,
                data,
              }: {
                statusCode: number;
                message: string;
                data: any | null;
              }) => {
                res.status(statusCode).json({ statusCode, message, data });
              }
            );


          } catch (error) {
            res.status(500).json({
              message: "Error uploading images",
              statusCode: 500,
              data: null,
            });
          }
        } else {
          res.status(400).json({
            message: "No files were uploaded",
            statusCode: 400,
            data: null,
          });
        }
      });

      break;

    default:
      res.status(405).json({
        statusCode: 405,
        message: "Method Not Allowed",
        data: null,
      });
      break;
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
