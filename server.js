import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const API_URL = "https://deckofcardsapi.com/api/deck/";

app.set("views engine", "views");
app.set(
  "views",
  "/Users/ttp/Documents/GitHub/A Simple Card Game/Untitled/API-Project/views"
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render(__dirname + "/views/index.ejs");
});

app.post("/play", async (req, res) => {
  try {}
    const result = await axios.get(API_URL + "new/");
    res.render("index.ejs", { content: JSON.stringify(result.data) });
    console.log(result.data);
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
