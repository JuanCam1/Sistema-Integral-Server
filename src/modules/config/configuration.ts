export default () => ({
  port: parseInt(process.env.PORT || "8080", 10),
  database: {
    database: process.env.DATABASE || "",
    username_db: process.env.USERNAME_DB || "",
    password_db: process.env.PASSWORD_DB || "",
    database_host: process.env.DATABASE_HOST || "localhost",
    database_port: parseInt(process.env.DATABASE_PORT || "5432", 10),
  },
});
