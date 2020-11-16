const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/key');


const {User} = require('./models/User');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());


mongoose.connect(config.mongoURI,
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World! hahaha'));

app.post('/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) {
            return res.json({success: false, err});
        }
        return res.status(200).json({success: true});
    });
});

app.post('/login', (req, res) => {
    // find email from database
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "이메일에 해당하는 유저가 없습니다."
            })
        }

        // check correct password
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) {
                return res.json({ loginSuccess: false, message: "이메일 또는 비밀번호가 틀렸습니다."});
            }

        })
    });


    // create Token

});

app.listen(port, () => console.log(`Example app liteningon port ${port}!`));
