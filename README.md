# MFF-Web-TeamProject

## Deploy

Implemented but not properly tested. Mongo-Express should not be included in compose at all.

For deployment run:

```shell
docker compose --file docker-compose-deploy.yaml up -d
```

TODO?: setup GitHub Actions with formatting/type checking

## Development

Should be working properly. Hot reload setup as well. But very probable I made a mistake somewhere(paths are always a pain).

For development run:
```shell
docker compose up -d
```

In case a new package is added rebuild is needed -> run:
For development run:
```shell
docker compose build
```
It is probably a good idea to run this command after pulling from GitHub


If you stop developing for the day run:
For development run:
```shell
docker compose down
```
So you are not losing your computer resources :)


