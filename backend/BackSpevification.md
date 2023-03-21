# Backend Specification - Docs
 
- `index.js` is the entry point of the application
- `App` is the main crawler application

### crawler.js

- Recursively crawls the website with set depth

### page.js

Link processing 
It's a class that takes a page and returns a list of links on the page.

What links might look like:

- `https://www.example.com`
- `https://www.example.com/1`
- `https://www.example.com/?q=1`
- `https://www.example.com#1`
- `/example/1` (relative link to the same domain)
- Or something wrong

