const db = require("../connection");   // importa a conexão com o banco de dados PostgreSQL
const format = require("pg-format");   //  importa a biblioteca pg-format, que ajuda a criar consultas SQL

const { createLookupObj, convertTimestampToDate } = require('./utils'); // importo a funcao que eu criei

const seed = ({ topicData, userData, articleData, commentData }) => {
  let insertedArticles;

  return db.query(`DROP TABLE IF EXISTS comments;`) // um comentário depende de um artigo existir
    .then(() => db.query(`DROP TABLE IF EXISTS articles;`)) //Artigos dependem de usuários e tópicos
    .then(() => db.query(`DROP TABLE IF EXISTS users;`)) //
    .then(() => db.query(`DROP TABLE IF EXISTS topics;`))

    // Criar tabela topics
    .then(() => {
      return db.query(`
        CREATE TABLE topics (
          slug VARCHAR PRIMARY KEY,
          description VARCHAR NOT NULL,
          img_url VARCHAR(1000)
        );
      `);
    })

    // Criar tabela users
    .then(() => {
      return db.query(`
        CREATE TABLE users (
          username VARCHAR PRIMARY KEY,
          name VARCHAR NOT NULL,
          avatar_url VARCHAR(1000)
        );
      `);
    })

    // Criar tabela articles
    .then(() => {
      return db.query(`
        CREATE TABLE articles (
          article_id SERIAL PRIMARY KEY,
          title VARCHAR NOT NULL,
          topic VARCHAR REFERENCES topics(slug) NOT NULL,
          author VARCHAR REFERENCES users(username) NOT NULL,
          body TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          votes INT DEFAULT 0,
          article_img_url VARCHAR(1000)
        );
      `);
    })

    // Criar tabela comments
    .then(() => {      // ON DELETE CASCADE NOT NULL -> se deletar o artigo, apaga os comentários juntos.
      return db.query(`
        CREATE TABLE comments (
          comment_id SERIAL PRIMARY KEY,
          article_id INT REFERENCES articles(article_id) ON DELETE CASCADE NOT NULL,
          body TEXT NOT NULL,
          votes INT DEFAULT 0,
          author VARCHAR REFERENCES users(username) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
    })

    .then(() => {
      const formattedTopics = topicData.map(({ slug, description, img_url }) => [slug, description, img_url]);
      const queryStr = format(`INSERT INTO topics (slug, description, img_url) VALUES %L RETURNING *;`,formattedTopics);
      return db.query(queryStr);

    })

    .then(() => {
      const formattedUsers = userData.map(({ username, name, avatar_url }) => [username, name, avatar_url]);
      const queryStr = format(`INSERT INTO users (username, name, avatar_url) VALUES %L RETURNING *;`, formattedUsers);
      return db.query(queryStr);
    })

    // Inserir dados articles e salvar resultado para mapear article_id
    .then(() => {

      const articlesWithDates = articleData.map(convertTimestampToDate); //usando a funcao para mudar o timestamp

      const formattedArticles = articlesWithDates.map(({ title, topic, author, body, created_at, votes, article_img_url }) => [
        title,
        topic,
        author,
        body,
        created_at,
        votes || 0,
        article_img_url || null,
      ]);
      const queryStr = format(`INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *;`, formattedArticles);
      return db.query(queryStr);
    })

    .then((result) => {
      insertedArticles = result.rows; // guarda os artigos com os IDs reais

      // Criar mapa para relacionar título do artigo com o ID real
      const lookupMap = createLookupObj(insertedArticles, "title", "article_id");

      // Preparar comentários, substituindo article_title pelo article_id real

      const commentsDataWithDates = commentData.map(convertTimestampToDate);

      const formattedComments = commentsDataWithDates.map(({ article_title, body, votes, author, created_at }) => {

        // Usar lookupMap para pegar o article_id
          const realArticleId = lookupMap[article_title];

          if (!realArticleId) {
          throw new Error(`Artigo com título "${article_title}" não encontrado para comentário.`);
        }
        return [
          realArticleId,
          body,
          votes || 0,
          author,
          created_at,
        ];
      });

      const queryStr = format(`INSERT INTO comments (article_id, body, votes, author, created_at) VALUES %L RETURNING *;`, formattedComments);
      return db.query(queryStr);
    });


};

module.exports = seed;
