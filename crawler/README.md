# Crawler backend

## Getting started

```shell
npm install
npm run buildAndStart
```

## Backend summary

**How to get data from the web?**
1. Fetch data from the web and parse it
2. Create a browser and navigate to the page

We will use the first approach because it is faster and more than half part of the sites contain static HTML.

Also we are using **workers** for crawling multiple pages at the same time.

### Execution management

- Each active website record is executed based on the periodicity. 
- Each execution creates a new execution. 
- For example, if the Periodicity is an hour, the executor tries to crawl the site every hour ~ last execution time + 60 minutes. 
(We use the last execution time because the execution can take more than an hour, and we don't want to start a new execution before the previous one is finished.)
- If there is no execution for a given record and the record is active the crawling is started as soon as possible, this is implemented **using some sort of a queue**. 
- A user can list all the executions, or filter all executions for a single website record. 
- In both cases, the list is paginated. 
- The list must contain the website record's *label*, execution *status*, *start/end* time, and _number_ of sites crawled. 
- A user can **manually start** an execution for a given website record. 
- When a website record is deleted all executions and relevant data are removed as well.

### Executor (Crawling)

The executor is responsible for executing, i.e. crawling selected websites. 
Crawler downloads the website and looks for all hyperlinks. 
For each detected hyperlink that matches the website record Boundary RegExp, the crawler also crawls the given pages. 
For each crawled website it creates a record with the following data:
- URL
- Crawl time
- Title - page title
- Links - List of outgoing links

Crawled data are stored as a part of the website record, so the old data are lost once the new execution is successfully finished. It must be possible to run multiple executions at once.

We use threads to crawl multiple pages at the same time. We use node.js [worker_threads](https://nodejs.org/api/worker_threads.html) for this. 