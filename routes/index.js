const express = require('express');
const router = express.Router();

const Axios = require("axios");
const cheerio = require('cheerio');

/* GET home page. */
router.get('/', async (req, res, next) => {
  let {keyword, url} = req.query;
  let posArray = [];
  for(var i=0; i<3; i++){ // this should have been 10 for the first 100 results, but it may take too long
    await sleep(random(2,5)*1000); // pause for random time (between 2 to 5) so that google doesnt block you for DOS
    await search(keyword.replace(/ /gi, '+'), url, i, posArray);
  }
  res.send(posArray);
});

const random = (min,max) =>
  Math.floor(Math.random()*(max-min+1)+min)


const sleep = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms))

const search = async (keyword, url, page, posArray)=>{
  console.log(`will exec : https://www.google.com.au/search?q=${keyword}&start=${page*10}`);
  try {
    const {data} = await Axios.get(`https://www.google.com.au/search?q=${keyword}&start=${page*10}`,
      {headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'}}
    );
    const $ = cheerio.load(data);
    let pos = 0;
    $('div.g').each((i, e) => {
      pos++;
      console.log($(e).text());
      if ($(e).text().match(new RegExp(url, 'gi')))
        posArray.push(page*10 + pos);
    });
    console.dir(posArray);
  } catch (e){
    console.log(`Error while fetching page ${page} : ${e.message}`);
  }
  return posArray;
}

module.exports = router;

