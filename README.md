## Leveraging Vector Search with MongoDB Atlas for Enhanced Movie Search

### Introduction

In the age of data-driven applications, search functionality is not just about matching keywords but understanding the context and semantics of the user queries. This becomes particularly challenging and intriguing when dealing with multimedia content like movies, where the plot or description encapsulates a vast array of themes and narratives. In this blog, I'll walk you through how I implemented a semantic search for movies using MongoDB Atlas's vector search capabilities powered by machine learning models from Hugging Face.

### The Dataset

For this project, I used MongoDB Atlas, which conveniently provides a sample dataset. Among the various collections, I focused on the `movies` collection within the `sample_mflix` database. Each document in this collection comprises multiple fields, but my primary interest was in the "plot" field, which contains a brief summary of the movie.

### Vector Embeddings

To transform the textual data from the movie plots into a machine-understandable format, I used vector embeddings. These embeddings help in converting the text into a high-dimensional space where semantically similar texts are closer to each other.

#### Generating Embeddings with Hugging Face

To create these embeddings, I utilized the Hugging Face API, specifically the `sentence-transformers/all-MiniLM-L6-v2` model. This model is well-suited for generating sentence-level embeddings and is balanced in terms of performance and computational efficiency. Here’s how the embedding generation is done via an API call:

```javascript
const { data } = await axios.post(
  "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2",
  {
    inputs: plotText,
  },
  {
    headers: {
      Authorization: `Bearer <yourtoken>`,
    },
  }
);
```

### Storing and Indexing Embeddings in MongoDB

After obtaining the embeddings, the next step was to add these as a new field (`plot_embedding`) in each movie document in the `movies` collection. To enable efficient search on these embeddings, I created a vector search index as follows:

```json
{
  "fields": [{
    "type": "vector",
    "path": "plot_embedding",
    "numDimensions": 384,
    "similarity": "cosine"
  }]
}
```

This index facilitates searching the embeddings using cosine similarity, which measures the cosine of the angle between two vectors, thus indicating how similar they are.

### Building the Search Function

For the search functionality, I developed a function to take a user's query, convert it into a vector using the same model, and perform a vector search using MongoDB's aggregation framework:

```javascript
async function searchMovies(query) {
  const queryVector = await GenerateVector(query);

  return collection.aggregate([
    {
      "$vectorSearch": {
        "index": "plotVectorIndex",
        "path": "plot_embedding",
        "queryVector": queryVector,
        "numCandidates": 150,
        "limit": 4
      }
    }
  ]).toArray();
}
```

### Application Setup

For the backend, I used Node.js and Express.js to handle the requests and responses. The front end was built using React.js, providing a user-friendly interface for submitting search queries and displaying the results.

### Conclusion

Vector search is a powerful technique for implementing semantic search, enabling applications to understand the context of user queries better. Using MongoDB Atlas's vector search capabilities combined with the robust machine learning models from Hugging Face, I was able to create a semantic search engine for movies that goes beyond traditional keyword matching.

This project not only enhanced my understanding of vector embeddings and MongoDB's search capabilities but also demonstrated how these technologies can be seamlessly integrated to build sophisticated and user-centric search functionalities in modern web applications.
