import axios from "axios";

export default axios.create({
  baseURL: "https://api.ebird.org/v2/ref/taxonomy/ebird",
  params: { fmt: "json" },
});
