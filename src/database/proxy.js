import Task from "./classes/Task.js"
import { tasksDatabase } from "./index.js"

/**
 * Gets a task from the database with the provided id.
 * 
 * @param {number} id The id of the task to get.
 * @returns {Promise<Task>} A promise that resolves with the task.
 */
export function getTask(
    id
) {
    return new Promise((resolve, reject) => {
        try {
            const result = tasksDatabase.prepare(`
                SELECT ROWID as id, owner_id, title, description, due_date, completed
                FROM tasks
                WHERE ROWID = ?
            `).get(id)

            return resolve(new Task(
                result.id,
                result.owner_id,
                result.title,
                result.description,
                new Date(result.due_date),
                result.completed
            ))
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
export function getAllTasks() {
    return new Promise((resolve, reject) => {
        try {
            // not implemented, return placeholder data
            return resolve([
                new Task(
                    0, // task id
                    0, // owner id
                    "Plan weekend trip", // title
                    "Plan a fun weekend getaway", // description
                    new Date('2023-09-29'), // due date
                    false, // completed
                ),
                new Task(
                    1,
                    0,
                    "Read a book",
                    "Spend some time reading a new book.",
                    new Date('2023-09-29'),
                    false,
                )
            ])
        } catch (error) {
            reject(error)
        }
    })
}