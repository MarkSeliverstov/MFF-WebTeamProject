db.auth("root", "password");
db = db.getSiblingDB("webapp");
db.createUser({
  user: "test",
  pwd: "test1234",
  roles: [{ role: "readWrite", db: "webapp" }],
});
db.createCollection("webpage_records", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "url",
        "periodicity",
        "regexp",
        "label",
        "active",
        "tags",
        "latestGroupId",
      ],
      additionalProperties: false,
      properties: {
        _id: {
          bsonType: "objectId",
        },
        url: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        periodicity: {
          bsonType: "object",
          required: ["minutes", "hours", "days"],
          additionalProperties: false,
          properties: {
            minutes: {
              bsonType: "int",
              description: "must be an int and is required",
              minimum: 0,
            },
            hours: {
              bsonType: "int",
              description: "must be an int and is required",
              minimum: 0,
            },
            days: {
              bsonType: "int",
              description: "must be an int and is required",
              minimum: 0,
            },
          },
        },
        regexp: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        label: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        active: {
          bsonType: "bool",
          description: "must be a bool and is required",
        },
        tags: {
          bsonType: "array",
          items: {
            bsonType: "string",
          },
        },
        latestGroupId: {
          bsonType: "int",
          description: "must be an int and is required",
          minimum: -1,
        },
      },
    },
  },
});

db.webpage_records.insertMany([
  {
    url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
    periodicity: {
      minutes: 19,
      hours: 0,
      days: 7,
    },
    regexp: "",
    label: "westernise East Avon",
    active: true,
    tags: ["repurpose", "bootie", "indigo"],
    latestGroupId: 0,
  },
  {
    url: "https://engineering.udacity.com/handling-errors-like-a-pro-in-typescript-d7a314ad4991",
    periodicity: {
      minutes: 19,
      hours: 0,
      days: 7,
    },
    regexp: "",
    label: "westernise East Avon",
    active: true,
    tags: [],
    latestGroupId: 0,
  },
  {
    url: "https://dictionary.cambridge.org/dictionary/english/how",
    periodicity: {
      minutes: 19,
      hours: 0,
      days: 7,
    },
    regexp: "",
    label: "westernise East Avon",
    active: true,
    tags: ["repurpose", "bootie", "indigo"],
    latestGroupId: 0,
  },
  {
    url: "https://www.merriam-webster.com/dictionary/how",
    periodicity: {
      minutes: 19,
      hours: 0,
      days: 7,
    },
    regexp: "",
    label: "westernise East Avon",
    active: true,
    tags: [],
    latestGroupId: 0,
  },
  {
    url: "https://en.bab.la/dictionary/english-czech/how",
    periodicity: {
      minutes: 19,
      hours: 0,
      days: 7,
    },
    regexp: "",
    label: "westernise East Avon",
    active: true,
    tags: ["repurpose", "bootie", "indigo"],
    latestGroupId: 0,
  }
]);
