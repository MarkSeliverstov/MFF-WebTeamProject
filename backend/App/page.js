class Page {
  /**
   * @param {URL} url - Url to crawl
   * @param {boolean} isActive - Is the page active
   * @param {string} crawlTime - Time of crawling
   * @param {string} title - Title of the page
   * @param {URL[]} links - List of links on the page
   * @param {Page[]} pages - List of pages
   */
   
  url;
  isActive = true;
  isRedirect = false;
  crawlTime;
  title;
  links = [];
  pages = [];

  async GetData(url) {
    this.url = new URL(url);
    
    // Get the data from the url
    try {
      const response = await fetch(url);
      const data = await response.text();
      this.title = data.match(/<title>(.*?)<\/title>/)[1];
      if (response.ok) {
        if (response.redirected){
          this.isRedirect = true;
          this.links = [new URL(response.url)];
        }
        else{
          this.links = this.GetUniqueLinks(data);
        }
      }
      else{
        this.isActive = false;
      }
    } catch (error) {
      this.isActive = false;
      console.log(error);
    }
  }

  /**
   * 
   * @param {string} data - HTML data from the page
   * @returns links - List of unique links on the page
   */
  GetUniqueLinks(data) {
    // Get all links from the page
    let links = data.match(/<a href="(.*?)">/g);
    
    let urls = [];
    let newLinks = [];
    // Get the href attribute from the link
    links.forEach((link) => {
        newLinks.push(link.match(/href="(.*?)"/)[1]);
    });

    // Create a list of URLs
    newLinks.forEach((link) => {
      // If the link is absolute
      if (link.match(/https?:\/\//)) {
        const newURL = new URL(link);
        urls.push(newURL);
      }
      // If the link is relative
      else{
        try{
          const newURL = new URL(this.url.protocol + "//" + this.url.host + link);
          urls.push(newURL);
        }catch (error){
          console.log("This link is not valid: " + link);
        }
      }
    });

    // Remve duplicates
    links = [];
    links.push(urls[0]);
    urls.forEach((url) => {
      let isUnique = true;
      links.forEach((newUrl) => {
          if (newUrl.host === url.host && newUrl.pathname === url.pathname && newUrl.search === url.search){
              isUnique = false;
              return;
          }
      });
      if (isUnique)
          links.push(url);
    });
    return links;
  }
}

module.exports.Page = Page;
