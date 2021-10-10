import { NextApiResponse, NextApiRequest } from "next";
import { getMetadataFromTable } from "../../_db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  // read metadata from table
  const { data: metaData, error } = await getMetadataFromTable(id as string);

  if (metaData) {
    const [data] = metaData;
    res.status(200).json(data);
  }

  if (error) {
    // if error return a fallback JSON
  }
};
