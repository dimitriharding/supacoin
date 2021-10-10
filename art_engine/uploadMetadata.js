require("dotenv").config();
const Supabase = require("@supabase/supabase-js");
const supabase = Supabase.createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);
let metadata = require("./build/json/_metadata.json");
metadata = metadata.sort((a, b) => a.edition - parseFloat(b.edition));

const upload = async () => {
  const { data, error } = await supabase
    .from(process.env.METADATA_TABLE_NAME)
    .insert([...metadata]);

  if (data) {
    console.log("Upload was successful");
    console.log({ data });
  }

  if (error) {
    console.log("Could not upload metadata");
    console.log({ error });
  }
};

(async () => {
  await upload();
})();
