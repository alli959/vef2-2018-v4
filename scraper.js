
require('isomorphic-fetch');

const util = require('util');

const {promisify} = require('util');

const cheerio = require('cheerio');

var redis = require("redis");

const client = redis.createClient({
  url: 'redis://localhost:6379'
});
const setAsync =
  util.promisify(client.set).bind(client);

const getAsync = 
  util.promisify(client.get).bind(client);








/* todo require og stilla dót */

/**
 * Listi af sviðum með „slug“ fyrir vefþjónustu og viðbættum upplýsingum til
 * að geta sótt gögn.
 */
const departments = [
  {
    name: 'Félagsvísindasvið',
    slug: 'felagsvisindasvid',
  },
  {
    name: 'Heilbrigðisvísindasvið',
    slug: 'heilbrigdisvisindasvid',
  },
  {
    name: 'Hugvísindasvið',
    slug: 'hugvisindasvid',
  },
  {
    name: 'Menntavísindasvið',
    slug: 'menntavisindasvid',
  },
  {
    name: 'Verkfræði- og náttúruvísindasvið',
    slug: 'verkfraedi-og-natturuvisindasvid',
  },
];

async function setClient(value,slug){

    await setAsync(slug, JSON.stringify(value), 'EX', 7200);

client.quit();
}


async function get(path){
  const response = await fetch(path);
  console.log('GET response status', response.status)
  const text = await response.json();
  console.log('GET response json', text);
  return text;
}






/**
 * Sækir svið eftir `slug`. Fáum gögn annaðhvort beint frá vef eða úr cache.
 *
 * @param {string} slug - Slug fyrir svið sem skal sækja
 * @returns {Promise} Promise sem mun innihalda gögn fyrir svið eða null ef það finnst ekki
 */
async function getTests(slug) {
  let text;
  if(slug === 'felagsvisindasvid'){
    const cached = await getAsync(slug)
    if (cached) {
      return JSON.parse(cached);
    }
    text = await get('https://ugla.hi.is/Proftafla/View/ajax.php?sid=2027&a=getProfSvids&proftaflaID=37&svidID=1&notaVinnuToflu=0');
  }
  else if(slug === 'heilbrigdisvisindasvid'){
    const cached = await getAsync(slug)
    if (cached) {
      return JSON.parse(cached);
    }
    text = await get('https://ugla.hi.is/Proftafla/View/ajax.php?sid=2027&a=getProfSvids&proftaflaID=37&svidID=2&notaVinnuToflu=0');
  }
  else if(slug === 'hugvisindasvid'){
    const cached = await getAsync(slug)
    if (cached) {
      return JSON.parse(cached);
    }
    text = await get('https://ugla.hi.is/Proftafla/View/ajax.php?sid=2027&a=getProfSvids&proftaflaID=37&svidID=3&notaVinnuToflu=0');
  }
  else if(slug === 'menntavisindasvid'){
    const cached = await getAsync(slug)
    if (cached) {
      return JSON.parse(cached);
    }
    text = await get('https://ugla.hi.is/Proftafla/View/ajax.php?sid=2027&a=getProfSvids&proftaflaID=37&svidID=4&notaVinnuToflu=0');
  }
  else if(slug === 'verkfraedi-og-natturuvisindasvid'){
    const cached = await getAsync(slug)
    if (cached) {
      return JSON.parse(cached);
    }
    text = await get('https://ugla.hi.is/Proftafla/View/ajax.php?sid=2027&a=getProfSvids&proftaflaID=37&svidID=5&notaVinnuToflu=0');
  }

  const $ = cheerio.load(text.html);
  const headers = await $('h3').map(function(i,el){
    return $(this).text().trim();
  }).get().join(',');

  const tests = [];
              

  for(let k = 2; k<=$('table').length; k++){
    for(let i = 1; i<=$(`table:nth-child(${k}) > tbody > tr`).length; i++){
        const value = {'course':  $(`.box > table:nth-child(${k}) > tbody > tr:nth-child(${i}) > td:nth-child(1)`).text(),
                        'name':$(`.box > table:nth-child(${k}) > tbody > tr:nth-child(${i}) > td:nth-child(2)`).text(),
                        'type':$(`.box > table:nth-child(${k}) > tbody > tr:nth-child(${i}) > td:nth-child(3)`).text(),
                        'students':$(`.box > table:nth-child(${k}) > tbody > tr:nth-child(${i}) > td:nth-child(4)`).text(),
                        'date':$(`.box > table:nth-child(${k}) > tbody > tr:nth-child(${i}) > td:nth-child(5)`).text()};
      tests.push(value);
      
                      }

    
  }

  const value = {'heading':headers,tests};


  setClient(value,slug);

  return value;


}




/**
 * Hreinsar cache.
 *
 * @returns {Promise} Promise sem mun innihalda boolean um hvort cache hafi verið hreinsað eða ekki.
 */
async function clearCache() {
  await client.flushall( function (err, succeeded) {
    console.log(succeeded); 
  });
  return {'clear':'cleared'}
}

/**
 * Sækir tölfræði fyrir öll próf allra deilda allra sviða.
 *
 * @returns {Promise} Promise sem mun innihalda object með tölfræði um próf
 */
async function getStats() {
    let text;
  if(slug === 'felagsvisindasvid'){
    const cached = await getAsync(slug)
    if (cached) {
      return JSON.parse(cached);
    }
    text = await get('https://ugla.hi.is/Proftafla/View/ajax.php?sid=2027&a=getProfSvids&proftaflaID=37&svidID=1&notaVinnuToflu=0');
  }
  else if(slug === 'heilbrigdisvisindasvid'){
    const cached = await getAsync(slug)
    if (cached) {
      return JSON.parse(cached);
    }
    text = await get('https://ugla.hi.is/Proftafla/View/ajax.php?sid=2027&a=getProfSvids&proftaflaID=37&svidID=2&notaVinnuToflu=0');
  }
  else if(slug === 'hugvisindasvid'){
    const cached = await getAsync(slug)
    if (cached) {
      return JSON.parse(cached);
    }
    text = await get('https://ugla.hi.is/Proftafla/View/ajax.php?sid=2027&a=getProfSvids&proftaflaID=37&svidID=3&notaVinnuToflu=0');
  }
  else if(slug === 'menntavisindasvid'){
    const cached = await getAsync(slug)
    if (cached) {
      return JSON.parse(cached);
    }
    text = await get('https://ugla.hi.is/Proftafla/View/ajax.php?sid=2027&a=getProfSvids&proftaflaID=37&svidID=4&notaVinnuToflu=0');
  }
  else if(slug === 'verkfraedi-og-natturuvisindasvid'){
    const cached = await getAsync(slug)
    if (cached) {
      return JSON.parse(cached);
    }
    text = await get('https://ugla.hi.is/Proftafla/View/ajax.php?sid=2027&a=getProfSvids&proftaflaID=37&svidID=5&notaVinnuToflu=0');
  }
}

module.exports = {
  departments,
  getTests,
  clearCache,
  getStats,
};
