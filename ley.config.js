const { config } = require('dotenv');

config({ path: '.env.development.local' });
config({ path: '.env' });

process.env.PGHOST = process.env.POSTGRES_HOST;
process.env.PGPORT = process.env.POSTGRES_PORT;
process.env.PGDATABASE = process.env.POSTGRES_NAME;
process.env.PGUSER = process.env.POSTGRES_USER;
process.env.PGPASSWORD = process.env.POSTGRES_PASSWORD;

module.exports = {};
