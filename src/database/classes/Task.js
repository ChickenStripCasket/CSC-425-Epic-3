export default class Task {
    
    /**
     * Creates a Task with the provided properties.
     * 
     * @param {number} id The tasks's ID.
     * @param {number} ownerId The ID of the task's owner.
     * @param {string} title The title of the task.
     * @param {string} description The task's description.
     * @param {Date} dueDate WHen the task is due.
     * @param {boolean} completed If the task is completed.
     */
    constructor(
        id,
        ownerId,
        title,
        description,
        dueDate,
        completed
    ) {
        this.id = id
        this.ownerId = ownerId
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.completed = completed
    }

}