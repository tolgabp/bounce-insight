const express = require("express");
const router = express.Router();
const countryController = require("../controllers/countryController");

router.get("/countries", countryController.getAllCountries);
router.get("/countries/:name", countryController.getCountryByName);
router.get("/regions/:region", countryController.getCountriesByRegion);

module.exports = router;
