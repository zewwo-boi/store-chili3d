exports.up = async function (sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS data (
      id uuid PRIMARY KEY,
      synced_timestamp timestamp with time zone default current_timestamp,
      time_record jsonb
    );
  `;
};

exports.down = async function (sql) {
  await sql`DROP TABLE IF EXISTS data;`;
};
