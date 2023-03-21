const Page = require('./page');

class Crawler{
  /**
   * @param {Page} page - Page to crawl
   * @param {int} maxDepth - Max depth of recursion
   * @param {int} acualDepth - Actual depth of recursion
   */
  async CrawlRecursive(page, maxDepth = 1, acualDepth = 0, ){
    // console.log(acualDepth);
    page.pages = []

    // Each page has a list of links. 
    // For each link, create a new page and crawl it.
    for (let i = 0; i < page.links.length; i++) {
      let newPage = new Page.Page();
      await newPage.GetData((page.links[i]).href);

      // If the page is active, crawl it recursively
      if (page.activ)
        if (acualDepth < maxDepth && page.links.length > 0)
          await page.CrawlRecursive(maxDepth, acualDepth + 1);
        page.pages.push(page);
    }
  }

  async Start(url){
    let page = new Page.Page();
    await page.GetData(url);

    await this.CrawlRecursive(page, 1);
    console.log(page);
    console.log("Crawling finished");
  }
}

module.exports.Crawler = Crawler;