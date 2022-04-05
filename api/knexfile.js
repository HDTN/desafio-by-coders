require('dotenv').config();

module.exports = {
    client: process.env.CLIENT_DB,
    connection: {
      host: process.env.HOST_DB,
      port: process.env.POST_DB,
      database: process.env.DATABASE_NAME,
      user: process.env.USER_DB,
      password: process.env.PASSWORD_DB 
    },
    pool: {
      min: 2,
      max: 10
    },
    
    migrations: {
  
      directory: __dirname + '/src/database/migrations'
  
    },

    seeds: {
  
      directory: __dirname + '/src/database/seeds'
  
    }    
}