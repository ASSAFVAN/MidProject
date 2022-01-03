import axios from "axios";

export default axios.create({
  baseURL: "https://api.ebird.org/v2/data",
  headers: {
    "X-eBirdApiToken": "gqrh0a9j82ma",
  },
  params: {
    maxResults: 20,
  },
});
