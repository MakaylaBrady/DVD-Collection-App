const pool = require("./dbConfig.js");
const express = require("express");
const router = express.Router();


router.post("/add", async (req, res) => {
    try {
        const dvdsCount = (await pool.query("SELECT title FROM dvd")).rowCount;

        if (dvdsCount <= 100) {
            await pool.query("INSERT INTO dvd (title, category, runtime, yearrelease, price) VALUES($1, $2, $3, $4, $5)", [req.body.title, 
                req.body.category, req.body.runtime, req.body.year, req.body.price]);
        }
    } catch (err) {
        console.log(err);
    }
    res.end();
});

router.delete("/delete", async (req, res) => {
    try {
        await pool.query("DELETE FROM dvd WHERE title = $1;", [req.body.title]);
    } catch (err) {
        console.log(err);
    }
    res.end();
});

router.put('/update', async (req, res) => {
    try {
        const dvdExists = Boolean((await pool.query("SELECT * FROM dvd WHERE title = $1", [req.body.title])).rows.length);

        if (dvdExists) {
            await pool.query(`UPDATE dvd SET category = $2, runtime = $3, yearrelease = $4, price = $5 WHERE title = $1`, [req.body.title, 
                req.body.category, req.body.runtime, req.body.year, req.body.price]);
        } 
        else {
            await pool.query("INSERT INTO dvd (title, category, runtime, yearrelease, price) VALUES($1, $2, $3, $4, $5)", [req.body.title, 
                req.body.category, req.body.runtime, req.body.year, req.body.price]);
        }
    } catch (err) {
        console.log(err);
    }
    res.end();
});

module.exports = router;












