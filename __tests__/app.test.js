const endpointsJson = require("../endpoints.json");
/* Set up your test imports here */

const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed");   // importa a função de seed
const data = require("../db/data/test-data"); // importa os dados do teste
const db = require("../db/connection");  // importa a connection

/* Set up your beforeEach & afterAll functions here */
beforeEach(() => {
return seed(data);
});
afterAll(() => {
  return db.end();
});


describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("returns an array of topic objects containg 2 keys, slug and drescription", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).toBeInstanceOf(Array);   //tem que ser um array
        expect(body.topics.length).toBeGreaterThan(0); // nao pode estar vazio
        body.topics.forEach( (topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });

      });
  });
});
