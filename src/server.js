import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const API_URL = "https://deckofcardsapi.com/api/deck/";

// Use a simple in-memory game state (replace with session if needed)
let game = null;

// Blackjack scoring
function calculateScore(cards) {
  let total = 0;
  let aces = 0;

  for (const card of cards) {
    if (card.value === "ACE") {
      total += 11;
      aces++;
    } else if (["KING", "QUEEN", "JACK"].includes(card.value)) {
      total += 10;
    } else {
      total += parseInt(card.value, 10);
    }
  }
  
  while (total > 21 && aces > 0) {
    total -= 10; // Treat ace as 1 instead of 11
    aces--;
  }
  return total;
}

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// HOME
app.get("/", (req, res) => {
  res.render("index.ejs", { game });
});

// START A NEW GAME
app.post("/play", async (req, res) => {
  try {
    const deckResponse = await axios.get(API_URL + "new/shuffle/?deck_count=1");
    const deckId = deckResponse.data.deck_id;

    const cards = await axios.get(API_URL + deckId + "/draw/?count=4");
    const playerHand = [cards.data.cards[0], cards.data.cards[2]];
    const dealerHand = [cards.data.cards[1], cards.data.cards[3]];

    game = {
      deckId,
      player: { hand: playerHand, score: calculateScore(playerHand) },
      dealer: { hand: dealerHand, score: calculateScore(dealerHand) },
      status: "playing", // 'playing', 'win', 'lose', 'push'
    };

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.render("index.ejs", { game: null, error: "Failed to start game." });
  }
});

// HIT
app.post("/hit", async (req, res) => {
  if (!game || game.status !== "playing") return res.redirect("/");

  try {
    const card = await axios.get(
      API_URL + game.deckId + "/draw/?count=1"
    );
    game.player.hand.push(card.data.cards[0]);
    game.player.score = calculateScore(game.player.hand);

    if (game.player.score > 21) {
      game.status = "lose";
    } else if (game.player.score === 21) {
      return res.redirect("/stand"); // auto-stand
    }

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

// STAND
app.post("/stand", async (req, res) => {
  if (!game || game.status !== "playing") return res.redirect("/");

  try {
    // Dealer draws until 17
    while (game.dealer.score < 17) {
      const card = await axios.get(
        API_URL + game.deckId + "/draw/?count=1"
      );
      game.dealer.hand.push(card.data.cards[0]);
      game.dealer.score = calculateScore(game.dealer.hand);
    }

    // Determine winner
    if (game.dealer.score > 21) game.status = "win";
    else if (game.player.score > game.dealer.score) game.status = "win";
    else if (game.player.score < game.dealer.score) game.status = "lose";
    else game.status = "push"; // tie

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
