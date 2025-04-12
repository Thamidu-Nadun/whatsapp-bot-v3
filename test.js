import axios from "axios";

const url = "https://image.pollinations.ai/prompt/cat with a ball";

const res = await axios.get(url);
console.log(res);