export default function (db, exists) {
    if (exists) { return }

    db.prepare(`CREATE TABLE IF NOT EXISTS users (
        ROWID INTEGER PRIMARY KEY
    )`).run()

    //
    db.prepare(`CREATE TABLE IF NOT EXISTS tasks (
        ROWID INTEGER PRIMARY KEY,
        owner_id INTEGER NOT NULL,
        title TEXT,
        description TEXT,
        due_date TEXT,
        completed INTEGER DEFAULT 0 NOT NULL,
        FOREIGN KEY (owner_id) REFERENCES users (ROWID) ON DELETE CASCADE
    )`).run()
}