require('dotenv').config();
require('isomorphic-fetch');

const cheerio = require('cheerio');



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

/*async function client(){
const client = redis.createClient({
  url: redisUrl
});
const setAsync =
  promisify(client.set).bind(client);

await asyncSet('hello', 'world', 'EX', 10);

client.quit();
}*/


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
    text = await get('https://ugla.hi.is/Proftafla/View/ajax.php?sid=2027&a=getProfSvids&proftaflaID=37&svidID=1&notaVinnuToflu=0');
  }
  else if(slug === 'heilbrigdisvisindasvid'){
    text = await get('https://ugla.hi.is/Proftafla/View/ajax.php?sid=2027&a=getProfSvids&proftaflaID=37&svidID=2&notaVinnuToflu=0');
  }
  else if(slug === 'hugvisindasvid'){
    text = await get('https://ugla.hi.is/Proftafla/View/ajax.php?sid=2027&a=getProfSvids&proftaflaID=37&svidID=3&notaVinnuToflu=0');
  }
  else if(slug === 'menntavisindasvid'){
    text = await get('https://ugla.hi.is/Proftafla/View/ajax.php?sid=2027&a=getProfSvids&proftaflaID=37&svidID=4&notaVinnuToflu=0');
  }
  else if(slug === 'verkfraedi-og-natturuvisindasvid'){
    text = await get('https://ugla.hi.is/Proftafla/View/ajax.php?sid=2027&a=getProfSvids&proftaflaID=37&svidID=5&notaVinnuToflu=0');
  }

  const $ = cheerio.load(text.html);
  const headers = await $('h3').map(function(i,el){
    return $(this).text().trim();
  }).get().join(',');

  const heading = {'heading': headers};
  

  return heading;


}




/**
 * Hreinsar cache.
 *
 * @returns {Promise} Promise sem mun innihalda boolean um hvort cache hafi verið hreinsað eða ekki.
 */
async function clearCache() {
  /* todo */
}

/**
 * Sækir tölfræði fyrir öll próf allra deilda allra sviða.
 *
 * @returns {Promise} Promise sem mun innihalda object með tölfræði um próf
 */
async function getStats() {
  /* todo */
}

module.exports = {
  departments,
  getTests,
  clearCache,
  getStats,
};
