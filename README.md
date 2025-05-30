# NC News Seeding



To run the project locally I need to create 2 environment variable files in the project:

- `.env.test` – for the test database
- `.env.development` – for the development database

Each file should contain one line, like this:
.env.test
PGDATABASE=nc_news_test
.env.development
PGDATABASE=nc_news

These database names were created when I ran:
npm run setup-dbs
