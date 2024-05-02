const axios = require("axios");

const GenerateVector = async (string) => {
  const { data } = await axios.post(
    "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2",
    {
      inputs: string,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
      },
    }
  );

  return data;
};

module.exports = GenerateVector;
