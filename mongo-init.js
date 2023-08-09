db.auth('root', 'password');
db = db.getSiblingDB('webapp');
db.createUser({
  user: 'test',
  pwd: 'test1234',
  roles: [{ role: 'readWrite', db: 'webapp' }]
});
db.createCollection('webpages');
