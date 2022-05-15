const express = require("express");
const router = express.Router();
const axios = require("axios");

const apiKey = process.env.API_KEY;

router.get("/characters", async (req, res) => {
  try {
    let filters = "";

    if (req.query.skip) {
      filters += `&skip=${req.query.skip}`;
    }
    if (req.query.name) {
      filters += `&name=${req.query.name}`;
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}${filters}`
    );

    res.json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.get("/characters/:characterId", (req, res) => {
  try {
    const response = axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${apiKey}`
    );

    res.json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
