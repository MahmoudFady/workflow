const { PORT, DB_URI, NODE_ENV } = process.env;
export default {
  PORT: PORT || 8080,
  DB_URI: DB_URI || "mongodb://127.0.0.1:27017/testDB",
  storageType: "filesystem",
  NODE_ENV: NODE_ENV || "dev",
};
