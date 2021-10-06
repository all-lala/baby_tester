require('dotenv-flow').config()
const pg = require('pg')
const pgtools = require('pgtools')

class DB
{
  static #instance
  #pool

  /**
   * Get singleton instance
   * @returns 
   */
  static getInstance() {
    if(!DB.#instance) {
      DB.#instance = new DB()
    }
    return DB.#instance
  }

  /**
   * Connect toi the db
   * @returns 
   */
  async connect() {
    console.info('CREATE POOL DB')
    const pool = new pg.Pool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOS,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
    })

    try  {
      console.info('CONNECT TO DB')
      await pool.connect()
    } catch(e) {
      console.error(e)
      await this.create()
    }
    
    console.info('CONNECTED TO DB')
    this.#pool = pool
  }

  /**
   * Create database
   */
  create() {
    console.info('CREATE DB')
    return new Promise((resolve, reject) => {
      pgtools.createdb({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOS,
        port: Number(process.env.DB_PORT)
      }, process.env.DB_NAME, (err, res) => {
        if(err) {
          console.error(err)
          reject(err)
        } else {
          console.info('DB CREATED')
          resolve(res)
        }
      })
    })
  }

  /**
   * Query the DB
   * @param {string} query 
   * @param {array} args 
   * @returns 
   */
  async query(query, args = []) {
    if(!this.#pool) await this.connect()
    return this.#pool.query(query, args)
  }
}

module.exports = DB.getInstance()
