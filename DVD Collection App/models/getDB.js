const pool = require("./dbConfig.js");
const express = require("express");
const router = express.Router();

router.get('/get', async (req, res) => {
    try {
        const dvds = (await pool.query("SELECT * FROM dvd")).rows;
        res.json(dvds);
    } catch (err) {
        console.log(err);
    }
    res.end();
});

module.exports = router;




