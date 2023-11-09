import sqlite3 from 'better-sqlite3'
import { existsSync, mkdirSync } from 'fs'
import tasksInit from './initializers/tasksInit.js'

// create data directory
const dataDirectory = "../../data/"
if (!existsSync(dataDirectory)) {
    mkdirSync(dataDirectory)
}

const dbPath = dataDirectory + 'tasks.db'

const dbExists = existsSync(dbPath)
const db = new sqlite3(dbPath)

db.pragma("journal_mode = WAL")

// call init
try {
    tasksInit(db, dbExists)
} catch (error) {
    console.log(`Initialization failed for database. Error: ${error}`)
}

export const tasksDatabase = db