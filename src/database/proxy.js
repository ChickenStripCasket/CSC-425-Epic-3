import Task from "./classes/Task.js"
import { tasksDatabase } from "./index.js"

function buildTask(task){
    return new Task(
        task.id,
        task.owner_id,
        task.title,
        task.description,
        new Date(task.due_date),
        task.completed
    )
}

/**
 * Gets a task from the database with the provided id.
 * 
 * @param {number} id The id of the task to get.
 * @returns {Promise<Task>} A promise that resolves with the task.
 */
export function getTask(
    id,
    ownerId
) {
    return new Promise((resolve, reject) => {
        try {
            const result = tasksDatabase.prepare(`
                SELECT ROWID as id, owner_id, title, description, due_date, completed
                FROM tasks
                WHERE ROWID = ? AND owner_id = ?
            `).get(id, ownerId)

            return resolve(buildTask(result))
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * Gets every task within the database and returns them.
 * 
 * @returns {Task[]} An array of every task in the database.
 */
export function getAllTasks(ownerId, limit, offset) {
    return new Promise((resolve, reject) => {
        try {
            const result = tasksDatabase.prepare(`
            SELECT ROWID as id, owner_id, title, description, due_date, completed
            FROM tasks
            WHERE owner_id = ?
            LIMIT ?
            OFFSET ?
            `).all(ownerId, limit, offset)

            const tasks = []
            for(const task of result){
                tasks.push(buildTask(task))
            }
            return resolve(tasks)
        } catch (error) {
            reject(error)
        }
    })
}