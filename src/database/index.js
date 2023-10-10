/**
 * Gets a task from the database with the provided id.
 * 
 * @param {number} id The id of the task to get.
 * @returns {Promise<Object>} A promise that resolves with the task.
 */
export function getTask(
    id
) {
    return new Promise((resolve, reject) => {
        try {
            // not implemented, return placeholder data
            return resolve({
                id: id,
                title: "Plan weekend trip",
                dueDate: "2023-09-29",
                completed: false,
                description: "Plan a fun weekend getaway."
            })
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * Gets every task within the database and returns them.
 * 
 * @returns {Object[]} An array of every task in the database.
 */
export function getAllTasks() {
    return new Promise((resolve, reject) => {
        try {
            // not implemented, return placeholder data
            return resolve([
                {
                    id: 0,
                    title: "Plan weekend trip",
                    dueDate: "2023-09-29",
                    completed: false,
                    description: "Plan a fun weekend getaway."
                },
                {
                    id: 1,
                    title: "Read a book",
                    dueDate: "2023-09-29",
                    completed: true,
                    description: "Spend some time reading a new book."
                }
            ])
        } catch (error) {
            reject(error)
        }
    })
}