const Pool = require("pg").Pool;

const pool = new Pool({
    "user": "",
    "password": "",
    "host": "localhost",
    "port": ,
    "database": "dvdcollection"
});

module.exports = pool;