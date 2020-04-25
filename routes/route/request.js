var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var axios = require('axios');
var cheerio = require('cheerio');
var log = console.log;

router.get('/todaycorona', (req, res) => {
    var datab = fs.readFileSync('./todaycorona.txt', 'utf8');
    var dataArr = datab.split('@');
    var json = {
        accrue: dataArr[0],
        complete: dataArr[1],
        care: dataArr[2],
        die: dataArr[3],
        accrue1: dataArr[4],
        complete1: dataArr[5],
        care1: dataArr[6],
        die1: dataArr[7]
    };
    res.json(json);
});

router.get('/mask', (req, res) => {
    var addr = req.query.address;
    var uri = "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json";
    request({
        uri:uri,
        qs:{
            address:addr
        }
        
    }, (err,response,body) => {
        var teemp = JSON.parse(body);
        console.log(typeof(teemp));
        res.json(teemp);
    });
});

router.get('/covnews', (req, res) => {
    var url =
        'https://search.naver.com/search.naver?where=news&query=%EC%BD%94%EB%A1%9C%EB%82%9819&sm=tab_srt&sort=0&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so%3Ar%2Cp%3Aall%2Ca%3Aall&mynews=0&refresh_start=0&related=0';
    request(url, (err, response, body) => {
        var Arr1 = [];
        var Arr2 = [];
        var Arr3 = [];
        var Arr4= [];
        var Arr5 = [];
        const $ = cheerio.load(body);
        var colArr = $('dt');
        for (var i = 0; i < colArr.length; i++) {
            if (colArr[i].children[0].attribs.title == undefined) {
                continue;
            }
            if (colArr[i].children[0].attribs.href == undefined) {
                continue;
            }
            Arr1.push(colArr[i].children[0].attribs.title);
            Arr3.push(colArr[i].children[0].attribs.href);
        }
        colArr = $('dd.txt_inline');
        for (var i = 0; i < colArr.length; i++) {
            if (colArr[i].children[0].children[0].data == undefined) {
                continue;
            }
            if(colArr[i].children[3].data == undefined) { continue; } 
            Arr2.push(colArr[i].children[0].children[0].data);
            Arr4.push(colArr[i].children[3].data);
        }
        colArr = $('a.thmb80');
        for(var i = 0;i<colArr.length; i++) {
            if(colArr[i].children[0].attribs.src == undefined) {
                continue;
            }
            Arr5.push(colArr[i].children[0].attribs.src);
        }
        
        
        
        var json = [];
        for (var i = 0; i < Arr1.length; i++) {
            var tmp = {
                title: Arr1[i],
                link: Arr3[i],
                press: Arr2[i],
                time: Arr4[i],
                thumb: Arr5[i]
            };
            json.push(tmp);
        }
        res.json(json);
    });
});

module.exports = router;