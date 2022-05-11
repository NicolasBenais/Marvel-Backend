const express = require("express");
const router = express.Router();
const axios = require("axios");

const apiKey = process.env.API_KEY;

router.get("/comics", (req, res) => {
  try {
    axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}`
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

router.get("/comics/:characterId", (req, res) => {
  try {
    axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${apiKey}`
      )
      .then((response) => {
        // console.log(response.data);
        // console.log(req.params);
        res.json(response.data);
      });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
