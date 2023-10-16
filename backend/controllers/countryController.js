require("dotenv").config();
const axios = require("axios");

async function getCountryByName(req, res) {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${req.params.name}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching country by name:", error.message);
    res.status(500).json({ error: "Error fetching country data" });
  }
}

async function getAllCountries(req, res) {
  try {
    const response = await axios.get(process.env.REST_COUNTRIES_API_URL);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching all countries:", error.message);
    res.status(500).json({ error: "Error fetching countries data" });
  }
}

async function getCountriesByRegion(req, res) {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/region/${req.params.region}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching countries by region:", error.message);
    res.status(500).json({ error: "Error fetching region data" });
  }
}

module.exports = {
  getCountryByName,
  getAllCountries,
  getCountriesByRegion,
};
