const TEST = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_DB,
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  options: {
    enableArithAbort: true,
  },
  connectTimeout: 300000,
  dialectOptions: {
    options: {
      requestTimeout: 300000,
    },
  },
  retry: {
    match: [/Deadlock/i], // The retry config if Deadlock Happened
    max: 3, // Maximum rety 3 times
    backoffBase: 1000, // Initial backoff duration in ms. Default: 100,
    backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
  },
};


