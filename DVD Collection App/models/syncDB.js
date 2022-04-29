const pool = require("./dbConfig.js");
const express = require("express");
const router = express.Router();

router.put('/sync', async (req, res) => {
    try {
        const frontendDVDs = [];
        req.body.forEach((dvd) => {
            frontendDVDs.push(dvd.title);
        });

        const backendDVDs = [];
        const dbDVDs = (await pool.query("SELECT title FROM dvd")).rows;
        dbDVDs.forEach((dvd) => {
            backendDVDs.push(dvd.title);
        });

        // dvd that need to be deleted
        const culprits = [];

        backendDVDs.forEach((dvd) => {
            if (!frontendDVDs.includes(dvd)) {
                culprits.push(dvd);
            }
        });

        culprits.forEach(async (culprit) => {
            await pool.query("DELETE FROM dvd WHERE title = $1;", [culprit]);
        });
    } catch (err) {
        console.log(err);
    }

    res.end();
});

module.exports = router;




