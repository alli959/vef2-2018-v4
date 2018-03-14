require('dotenv').config();
require('isomorphic-fetch');

const cheerio = require('cheerio');

//const cheerio = require('cheerio');


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

async function client(){
const client = redis.createClient({
  url: redisUrl
});
const setAsync =
  promisify(client.set).bind(client);

await asyncSet('hello', 'world', 'EX', 10);

client.quit();
}


async function get(path){
  const response = await fetch(path);
  console.log('GET response status', response.status)
  const text = await response.text();
  console.log('GET response text', text);
  return await JSON.stringify(text);
}






/**
 * Sækir svið eftir `slug`. Fáum gögn annaðhvort beint frá vef eða úr cache.
 *
 * @param {string} slug - Slug fyrir svið sem skal sækja
 * @returns {Promise} Promise sem mun innihalda gögn fyrir svið eða null ef það finnst ekki
 */
async function getTests(slug) {
  const text = await get('https://ugla.hi.is/Proftafla/View/index.php?view=proftaflaYfirlit&sid=2030&proftaflaID=37')
  console.log(text);
  const $ = cheerio.load(text);
  console.log($);


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
