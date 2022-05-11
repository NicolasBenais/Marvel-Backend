const express = require("express");
const router = express.Router();
const axios = require("axios");

const apiKey = process.env.API_KEY;

router.get("/characters", (req, res) => {
  try {
    axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}`
      )
      .then((response) => {
        // console.log(response.data);
        res.json(response.data);
      });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.get("/characters/:characterId", (req, res) => {
  try {
    axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${apiKey}`
      )
      .then((response) => {
        res.json(response.data);
      });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
