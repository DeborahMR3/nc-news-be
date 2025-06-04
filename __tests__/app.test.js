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
  test.skip("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test.skip("returns an array of topic objects containg 2 keys, slug and drescription", () => {
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
  test("returns an object with the key of articles and the value of an array of article objects", () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then(( { body }) => {
      expect(body).toHaveProperty("articles");
      expect(Array.isArray(body.articles)).toBe(true);
    })
  })

  test("cehck that each article returned has all the properties: author, title, article_id, topic, created_at, votes, article_img_url AND comment_count", () => {
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

  test("the articles should be sorted by date in descending order.", () => {
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

  test("there should not be a body property present on any of the article objects..", () => {
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
