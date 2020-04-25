var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', (req,res) => {
    res.render('ejs/home', {
        'title':"43143"
    });
});

router.get('/confirm', (req,res) => {
    res.render('ejs/confirm');
});

router.get('/mask', (req,res) => {
    res.render('ejs/mask');
});

router.get('/news', (req,res) => {
    res.render('ejs/news');
});
router.get('/main', (req,res) => {
    res.render('ejs/main');
});
router.get('/editor', (req,res) => {
    res.render('ejs/editor');
});

module.exports = router;