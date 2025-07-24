import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const API_URL = "https://deckofcardsapi.com/api/deck/";

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: [], error: null });
});

app.post("/play", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "new/");
    const cards = await axios.get(
      API_URL + result.data.deck_id + "/draw/?count=2"
    );

    res.render("index.ejs", { content: cards.data.cards });
    console.log(cards.data.cards);
  } catch (error) {
    res.render("index.ejs", { content: error.response.data });
  }
});
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
