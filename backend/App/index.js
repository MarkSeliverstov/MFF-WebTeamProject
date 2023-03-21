const Crawler = require('./crawler');

let url = "https://webik.ms.mff.cuni.cz/nswi153/";
let crawler = new Crawler.Crawler();
crawler.Start(url);
