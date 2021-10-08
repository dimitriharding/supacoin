import { NextApiResponse, NextApiRequest } from "next";
import { getImagesData } from "./_db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await getImagesData();
  if (data) {
    res.status(200).json(data);
  }
};
