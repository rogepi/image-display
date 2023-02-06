// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getData, writeData } from "~/utils/file";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let data = getData();
  if (req.method === "GET") {
    res.status(200).json(data);
  }
  if (req.method === "POST") {
    const tmp = data;
    const body = JSON.parse(req.body);
    tmp.image = body.image;
    writeData(tmp);
    res.status(200).json(JSON.stringify(tmp));
    data = getData();
  }
}
