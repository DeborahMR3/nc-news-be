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
  test("GET - 200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test('GET - 200: responds with an array of topic objects, each containing "slug" and "description" properties', () => {
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

describe("GET /api/articles", () => {
  test('GET - 200: responds with an object with the key "articles" and the value as an array of article objects', () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then(( { body }) => {
      expect(body).toHaveProperty("articles");
      expect(Array.isArray(body.articles)).toBe(true);
    })
  })

  test('GET - 200: each article object contains "author", "title", "article_id", "topic", "created_at", "votes", "article_img_url", and "comment_count"', () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then(( { body }) => {
      expect(body).toHaveProperty("articles");
      expect(Array.isArray(body.articles)).toBe(true); // tem que ser array

      // const firstArticle = body.articles[0]
      // expect(firstArticle).toHaveProperty("author");  IRIA SER IMPOSSIVEL CHECAR ASSIM
      body.articles.forEach((article) => {
        expect(article).toHaveProperty("author");
        expect(article).toHaveProperty("title");
        expect(article).toHaveProperty("article_id");
        expect(article).toHaveProperty("topic");
        expect(article).toHaveProperty("created_at");
        expect(article).toHaveProperty("votes");
        expect(article).toHaveProperty("article_img_url");
        expect(article).toHaveProperty("comment_count");
      });
    });
  });

  test('GET - 200: returns articles sorted by "created_at" date in descending order', () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then(( { body }) => {
        const articleArray = body.articles
        // for (let i= 0; i < articleArray.length - 1; i++) {  // na ultima volta nao vai ter o proximo item!!
        //   expect(articleArray[i].created_at).toBeGreaterThan(articleArray[i + 1].created_at);
        // };

        for (let i = 0; i < articleArray.length - 1; i++) {   // na ultima volta nao vai ter o proximo item!!
          const current = new Date(articleArray[i].created_at).getTime();
          const next = new Date(articleArray[i + 1].created_at).getTime();
          expect(current).toBeGreaterThanOrEqual(next);
        }

    });
  });

  test('GET - 200: does not include "body" property on any article object', () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then(({ body }) => {
      body.articles.forEach(article => {
        expect(article.body).toBeUndefined();
      });
    });

  })

});
