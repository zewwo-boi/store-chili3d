exports.up = async function (DB) {
  await DB`create table if not exists data {
    id uuid primary key,
    synced_timestamp timestamp with time zone,
    time_record jsonb,
  }`;
}

exports.down = async function (DB) {
  // My pre-configured "undo" function
}