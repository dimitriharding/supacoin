import { createClient } from "@supabase/supabase-js";
const storeUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(".co", ".in");
const bucketName = process.env.SUPABASE_BUCKET;
const storeBaseUrl = `${storeUrl}/storage/v1/object/public/${bucketName}/images`;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SECRET_KEY as string
);

export const getImagesData = async () => {
  const { data, error } = await supabase.storage
    .from(bucketName as string)
    .list("images");

  if (data) {
    return data.map((image) => {
      return {
        src: `${storeBaseUrl}/${image.name}`,
        width: 1,
        height: 1,
        title: image.name,
      };
    });
  }

  if (error) {
    return [];
  }
};

export const getMetadata = (id: string) => {
  return supabase.storage
    .from(bucketName as string)
    .download(`json/${id}.json`);
};
