"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = "secretkey23456";

const app = express();
const router = express.Router();
app.use(cors())
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const database = new sqlite3.Database("./users.db");

const createUsersTable = () => {
    const sqlQuery = `
        CREATE TABLE IF NOT EXISTS users (
        id integer PRIMARY KEY,
        name text,
        email text UNIQUE,
        password text,
        admin text)`;

    return database.run(sqlQuery);
}

const createReportsTable = () => {
    const sqlQuery = `
        CREATE TABLE IF NOT EXISTS reports (
        id integer PRIMARY KEY,
        username text,
        date date,
        report text,
        approved text)`;

    return database.run(sqlQuery);
}

const findUserByEmail = (email, cb) => {
    return database.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
        cb(err, row)
    });
}

const createUser = (user, cb) => {
    console.log('createuser:', user)
    // console.log('cb:',cb)
    return database.run('INSERT INTO users (name, email, password, admin) VALUES (?,?,?,?)', user, (err) => {
        console.log(err)
        cb(err)
    });
}

const createReport = (report, cb) => {
    console.log('report:', report)
    // console.log('cb:',cb)
    return database.run('INSERT INTO reports (username, date, report, approved) VALUES (?,?,?,?)', report, (err) => {
        console.log('create report error: ', err)
        cb(err)
    });
}

const viewReports = (cb) => {
    return database.all(`SELECT * FROM reports`, (err, rows) => {
        console.log(err)
        console.log('view reports')
        rows.forEach(function (row) {
            console.log(row);
            console.log(typeof (row));
        });
    });
}

createUsersTable();
createReportsTable();
router.get('/', (req, res) => {
    res.status(200).send('This is an authentication server');
});

router.post('/register', (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    console.log(req.body);
    const password = bcrypt.hashSync(req.body.password);
    var admin = 'false'
    if (name == 'admin1') {
        console.log('admin here lol')
        admin = 'true'
       
    }

    
        createUser([name, email, password, admin], (err) => {
            if (err) return res.status(500).send("Server error!");
            findUserByEmail(email, (err, user) => {
                console.log(user)
                if (err) return res.status(500).send('Server error!');
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
                    expiresIn: expiresIn
                });

                res.status(200).send({
                    "user": user, "access_token": accessToken, "expires_in": expiresIn
                });
            });
        });
    
});


router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log('hello I reached')
    console.log('email:', email)
    findUserByEmail(email, (err, user) => {
        console.log('login user:', user)
        if (err) return res.status(500).send('Server error!');
        if (!user) return res.status(500).send('No Such User!!!');
        const result = bcrypt.compareSync(password, user.password);
        if (!result) return res.status(401).send('Password not valid!');

        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
            expiresIn: expiresIn
        });
        res.status(200).send({ "user": user, "access_token": accessToken, "expires_in": expiresIn });
    });
});

router.get('/viewnonAdminreport', (req, res) => {
    console.log('I reached here in view non admin report')
    console.log('look here: ', req.body)

    database.all(`SELECT * FROM reports WHERE approved = ?`, ['Approved'], (err, rows) => {
        console.log(err)
        console.log('view reports')
        console.log(rows)
        console.log(typeof (rows))

        var resultstring = JSON.stringify(rows)
        console.log('stringified results: ', resultstring)
        // rows.forEach(function (row) {
        //     console.log(row);
        //     console.log(typeof(row));
        // });
        if (err) { return res.status(500).send("Server error!"); }
        else { return res.status(200).send({ "ResultsfromSQL": resultstring }); }
    });



    // viewReports( (err, rows) => {

    //     console.log('what did i return',rows)
    //      // if (err) return  res.status(500).send('Server error!');
    //      // if (!user) return  res.status(404).send('User not found!');
    //      // const  result  =  bcrypt.compareSync(password, user.password);
    //      // if(!result) return  res.status(401).send('Password not valid!');

    //      // const  expiresIn  =  24  *  60  *  60;
    //      // const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
    //      //     expiresIn:  expiresIn
    //      // });
    //      if (err) { return res.status(500).send("Server error!"); }
    //      else {return res.status(200).send({ "Status": "Success" });}
    //  });


});

router.get('/viewreport', (req, res) => {
    console.log('I reached here in viewreport')
    console.log('look here: ', req.body)

    database.all(`SELECT * FROM reports`, (err, rows) => {
        console.log(err)
        console.log('view reports')
        console.log(rows)
        console.log(typeof (rows))

        var resultstring = JSON.stringify(rows)
        console.log('stringified results: ', resultstring)
        // rows.forEach(function (row) {
        //     console.log(row);
        //     console.log(typeof(row));
        // });
        if (err) { return res.status(500).send("Server error!"); }
        else { return res.status(200).send({ "ResultsfromSQL": resultstring }); }
    });



    // viewReports( (err, rows) => {

    //     console.log('what did i return',rows)
    //      // if (err) return  res.status(500).send('Server error!');
    //      // if (!user) return  res.status(404).send('User not found!');
    //      // const  result  =  bcrypt.compareSync(password, user.password);
    //      // if(!result) return  res.status(401).send('Password not valid!');

    //      // const  expiresIn  =  24  *  60  *  60;
    //      // const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
    //      //     expiresIn:  expiresIn
    //      // });
    //      if (err) { return res.status(500).send("Server error!"); }
    //      else {return res.status(200).send({ "Status": "Success" });}
    //  });


});

router.post('/editreport', (req, res) => {
    console.log('I reached here in editreport')
    console.log('look here: ', req.body)
    var id = req.body.id
    var text = req.body.reporttext
    var timeforseconds = new Date
    var seconds =  timeforseconds.getSeconds() < 10 ? '0' : '' + timeforseconds.getSeconds()
    console.log('seconds:',seconds)
    var currentSeconds = timeforseconds.getSeconds();
    currentSeconds = ("0" + currentSeconds).slice(-2);
    console.log('currentseconds:', currentSeconds)
    var d = new Date,
        dformat = [d.getFullYear(), d.getMonth() + 1,
        d.getDate(),
        ].join('-') + ' ' +
            [d.getHours(),
            d.getMinutes(),
           currentSeconds+"" ].join(':');
    console.log('new date', dformat)
    database.all(`UPDATE reports SET report = ?, date = ? WHERE id = ?`, [text, dformat, id], (err, rows) => {
        console.log(err)
        console.log('edit reports')
        console.log(rows)
        console.log(typeof (rows))

        var resultstring = JSON.stringify(rows)
        console.log('stringified results: ', resultstring)
        // rows.forEach(function (row) {
        //     console.log(row);
        //     console.log(typeof(row));
        // });
        if (err) { return res.status(500).send("Server error!"); }
        else { return res.status(200).send({ "ResultsfromSQL": resultstring }); }
    });




});

router.post('/approvereport', (req, res) => {
    console.log('I reached here in approvereport')
    console.log('look here: ', req.body)
    var id = req.body.id
    var boolean = 'Approved'
    var timeforseconds = new Date
    var currentSeconds = timeforseconds.getSeconds();
    currentSeconds = ("0" + currentSeconds).slice(-2);
    console.log('currentseconds:', currentSeconds)
    var d = new Date,
        dformat = [d.getFullYear(), d.getMonth() + 1,
        d.getDate(),
        ].join('-') + ' ' +
            [d.getHours(),
            d.getMinutes(),
           currentSeconds+"" ].join(':');
    console.log('new date', dformat)
    database.all(`UPDATE reports SET approved = ?, date = ? WHERE id = ?`, [boolean, dformat, id], (err, rows) => {
        console.log(err)
        console.log('edit reports')
        console.log(rows)
        console.log(typeof (rows))

        var resultstring = JSON.stringify(rows)
        console.log('stringified results: ', resultstring)
        // rows.forEach(function (row) {
        //     console.log(row);
        //     console.log(typeof(row));
        // });
        if (err) { return res.status(500).send("Server error!"); }
        else { return res.status(200).send({ "ResultsfromSQL": resultstring }); }
    });




});

router.post('/revokereport', (req, res) => {
    console.log('I reached here in revokereport')
    console.log('look here: ', req.body)
    var id = req.body.id
    var boolean = 'Not Approved'
    var timeforseconds = new Date
    var currentSeconds = timeforseconds.getSeconds();
    currentSeconds = ("0" + currentSeconds).slice(-2);
    console.log('currentseconds:', currentSeconds)
    var d = new Date,
        dformat = [d.getFullYear(), d.getMonth() + 1,
        d.getDate(),
        ].join('-') + ' ' +
            [d.getHours(),
            d.getMinutes(),
           currentSeconds +"" ].join(':');
    console.log('new date revoke', dformat)
    database.all(`UPDATE reports SET approved = ?, date = ? WHERE id = ?`, [boolean, dformat, id], (err, rows) => {
        console.log(err)
        console.log('edit reports')
        console.log(rows)
        console.log(typeof (rows))

        var resultstring = JSON.stringify(rows)
        console.log('stringified results: ', resultstring)
        // rows.forEach(function (row) {
        //     console.log(row);
        //     console.log(typeof(row));
        // });
        if (err) { return res.status(500).send("Server error!"); }
        else { return res.status(200).send({ "ResultsfromSQL": resultstring }); }
    });




});

router.post('/submitreport', (req, res) => {
    console.log('I reached here')
    console.log('look here: ', req.body)
    // if(res.status(200)){
    //     res.send("hello this");
    // }

    const text = req.body.reporttext;
    const date = req.body.date;
    const userid = req.body.userid;
    const approved = req.body.approved;
    console.log('text', text)
    console.log('date', date)
    console.log('userid', userid)
    console.log('approved', approved)
    createReport([userid, date, text, approved], (err, rows) => {

        console.log(rows)
        // if (err) return  res.status(500).send('Server error!');
        // if (!user) return  res.status(404).send('User not found!');
        // const  result  =  bcrypt.compareSync(password, user.password);
        // if(!result) return  res.status(401).send('Password not valid!');

        // const  expiresIn  =  24  *  60  *  60;
        // const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
        //     expiresIn:  expiresIn
        // });
        if (err) { return res.status(500).send("Server error!"); }
        else { return res.status(200).send({ "Status": "Success" }); }
    });

});
// router.post('/submitreport', (req, res) => {


//console.log('what is this:',req);
//console.log('res:',res);
//     const  password  =  bcrypt.hashSync(req.body.password);
//     var admin = 'false'
//    if(name  == 'admin1'){
//        console.log('admin here lol')
//        admin = 'true'
//    }
//     createUser([name, email, password, admin], (err)=>{
//         if(err) return  res.status(500).send("Server error!");
//         findUserByEmail(email, (err, user)=>{
//             console.log(user)
//             if (err) return  res.status(500).send('Server error!');  
//             const  expiresIn  =  24  *  60  *  60;
//             const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
//                 expiresIn:  expiresIn
//             });

//             res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn          
//             });
//         });
//     });
// });

app.use(router);
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log('Server listening at http://localhost:' + port);
}); 