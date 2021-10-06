const fs = require('fs')
const path = require('path')
const db = require('../services/db')

class Migrations
{
  static MIGRATION_TABLE_NAME = 'migrations'
  static MIGRATION_FILE_EXTENSION = '.sql'
  /**
   * Generate table et play migrations
   */
  static async generate() {
    await Migrations.createMigrationTable()
    const previousMigrations = await Migrations.getPreviousMigrations()
    const filesToMigrate =  await Migrations.getMigrationsFiles(previousMigrations)
    await Migrations.migrateFiles(filesToMigrate)
  }

  /**
   * Create migration table if not exist
   */
  static async createMigrationTable() {
    await db.query(`
    CREATE TABLE IF NOT EXISTS ${Migrations.MIGRATION_TABLE_NAME} (
      name TEXT NOT NULL
    );`
    )
  }
  
  /**
   * Get previous migrations files played
   * @returns 
   */
  static async getPreviousMigrations() {
    const result = await db.query({
      rowMode: 'array',
      text: `SELECT name FROM ${Migrations.MIGRATION_TABLE_NAME}`
    })
    return result.rows.flat()
  }

  /**
   * Get list of file to migrate without previous files
   * @param {string[]} previous 
   * @returns 
   */
  static async getMigrationsFiles(previous = []) {
    const files = fs.readdirSync(__dirname)
    return files.filter(file => !previous.includes(file)
      &&
      path.extname(file).toLowerCase() === Migrations.MIGRATION_FILE_EXTENSION
    ).sort((a, b)=>a-b)
  }

  /**
   * Migrate list of sql files
   * @param {*} files 
   */
  static async migrateFiles(files) {
    files.forEach(await Migrations.migrateFile)
  }

  /**
   * Migrate sql file
   * @param {*} file 
   */
  static async migrateFile(file) {
    const fileDatas = fs.readFileSync(path.join(__dirname, file)).toString()
    await db.query(fileDatas)
    await db.query(`INSERT INTO ${Migrations.MIGRATION_TABLE_NAME} (name) VALUES ($1)`, [file])
  }
}

module.exports = Migrations
