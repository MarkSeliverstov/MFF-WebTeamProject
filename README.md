# Web Crawler for MFF-team-project

This is a web crawler for the Advanced Web Programming course at MFF UK. <br>
The goal of this project is to create a [Web Crawler](https://cs.wikipedia.org/wiki/Web_crawler).
In this project, we will focus on the following topics:

- Crawling
- Indexing
- Web UI

We used the following technologies:

- [Node.js](https://nodejs.org/en/), [Express.js](https://expressjs.com/) with [MongoDB](https://www.mongodb.com/) for the backend
- [Svelte-kit](https://kit.svelte.dev/) for the frontend
- [Docker](https://www.docker.com/) for deployment


## How to start

```bash
$ git clone git@github.com:MarkSeliverstov/MFF-WebTeamProject.git
$ cd MFF-WebTeamProject
$ docker-compose up 
```

## Architecture

- backend: Node.js - express.js with threading support (crawlers)
- frontend: Svelte-kit
- database: MongoDB

## Development

To run a developing server, you need to have **Node.js** installed and then run:

```bash
$ cd backend && npm build && npm start
$ cd frontend && npm dev
```