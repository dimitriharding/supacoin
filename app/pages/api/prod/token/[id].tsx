import { NextApiResponse, NextApiRequest } from "next";
import { getMetadata } from "../../_db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  // download json from supabase storage
  const { data: blog, error } = await getMetadata(id as string);

  if (blog) {
    // convert Blog response to actual JSON that we can send in response
    const data = JSON.parse(await blog.text());
    res.status(200).json(data);
  }

  if (error) {
    // if error return a fallback JSON
  }
};
