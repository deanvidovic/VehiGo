// importi
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const dbURI = 'mongodb+srv://admin:vehigoadmin@vehigo.yluvl2q.mongodb.net/VehiGo?retryWrites=true&w=majority'

app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(3000, () => {
            console.log('server je pokrenut na portu 3000');
        })
        console.log("baza je uspjesno spojena!")
    })
    .catch((err) => {
        console.log(err)
    })



app.get('/', (req, res) => {
    res.render('index');
})


app.get('/signin', (req, res) => {
    res.render('sites/signin');
})
