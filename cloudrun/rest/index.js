const mysql = require('mysql');

const con = mysql.createConnection({
    host: '34.78.154.15',
    user: 'stupid',
    password: 'stupid',
});

con.connect((err) => {
    if (err) {
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});


const express = require('express');
const app = express();

app.get('/', (req, res) => {
    con.query('use projectCC', (err, rows) => {
        if (!err)
            con.query('SELECT max(done_at) as a FROM logging', (err, rows) => {
                if (!err) {
                    time_value = rows[0].a;
                    con.query('SELECT count(id) as b FROM logging', (err, rows2) => {
                        if (!err) {
                            console.log('Data received from Db:');
                            count_value = rows2[0].b;
                            console.log(count_value);
                            console.log(time_value);
                            var entryData = { time: time_value, count: count_value };
                            res.render('interface.ejs', { entries: entryData });
                        }
                    });
                }
            });

    });




});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`helloworld: listening on port ${port}`);
});