import router from "../routes/api/read.js";
import Task from "./classes/Task.js";
import { tasksDatabase } from "./index.js";

function buildTask(task) {
  return new Task(
    task.id,
    task.owner_id,
    task.title,
    task.description,
    new Date(task.due_date),
    task.completed
  );
}

/**
 * Gets a task from the database with the provided id.
 *
 * @param {number} id The id of the task to get.
 * @returns {Promise<Task>} A promise that resolves with the task.
 */
export function getTask(id, ownerId) {
  return new Promise((resolve, reject) => {
    try {
      const result = tasksDatabase
        .prepare(
          `
                SELECT ROWID as id, owner_id, title, description, due_date, completed
                FROM tasks
                WHERE ROWID = ? AND owner_id = ?
            `
        )
        .get(id, ownerId);

      return resolve(buildTask(result));
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Gets every task within the database and returns them.
 *
 * @returns {Task[]} An array of every task in the database.
 */
export function getAllTasks(ownerId, limit, offset) {
  return new Promise((resolve, reject) => {
    try {
      const result = tasksDatabase
        .prepare(
          `
            SELECT ROWID as id, owner_id, title, description, due_date, completed
            FROM tasks
            WHERE owner_id = ?
            LIMIT ?
            OFFSET ?
            `
        )
        .all(ownerId, limit, offset);

      const tasks = [];
      for (const task of result) {
        tasks.push(buildTask(task));
      }
      return resolve(tasks);
    } catch (error) {
      reject(error);
    }
  });
}

function checkIfTaskExists(ownerId, taskId) {
  return new Promise((resolve, reject) => {
    try {
      resolve(
        tasksDatabase
          .prepare(
            "SELECT ROWID, owner_id FROM tasks WHERE ROWID = ? AND owner_id = ? LIMIT 1"
          )
          .get(taskId, ownerId)
          ? true
          : false
      );
    } catch (error) {
      reject(error);
    }
  });
}

export function deleteTask(taskId, ownerId) {
  return new Promise(async (resolve, reject) => {
    try {
      const exists = await checkIfTaskExists(ownerId, taskId);
      if (exists) {
        tasksDatabase
          .prepare(
            `
                    DELETE FROM tasks WHERE owner_id = ? AND ROWID = ?
                `
          )
          .run(ownerId, taskId);
        return resolve(true);
      }
      return resolve(false);
    } catch (error) {
      reject(error);
    }
  });
}

export function createTask(ownerId, title, description, dueDate, completed) {
  return new Promise((resolve, reject) => {
    try {
      // Insert the new task into the database and retrieve its ID.
      const result = tasksDatabase
        .prepare(
          `
                INSERT INTO tasks (owner_id, title, description, due_date, completed)
                VALUES (?, ?, ?, ?, ?)
            `
        )
        .run(ownerId, title, description, dueDate, completed ? 1 : 0);

      const taskId = result.lastInsertRowid;

      // Retrieve the created task from the database and return it.
      const createdTask = getTask(taskId, ownerId);

      resolve(createdTask);
    } catch (error) {
      reject(error);
    }
  });
}

export function updateTask(
  taskId,
  ownerId,
  title,
  description,
  dueDate,
  completed
) {
  return new Promise(async (resolve, reject) => {
    try {
      tasksDatabase
        .prepare(
          `
            UPDATE tasks
            SET title = ?, description = ?, due_date = ?, completed = ?
            WHERE ROWID = ? AND owner_id = ?
        `
        )
        .run(title, description, dueDate, completed ? 1 : 0, taskId, ownerId);

      const updateTask = getTask(taskId, ownerId);

      resolve(updateTask);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Creates a new user and returns the user's id.
 * 
 * @returns {number} The new user's id.
 */
export function createUser() {
  return new Promise((resolve, reject) => {
    try {
      resolve(tasksDatabase.prepare(`INSERT INTO users DEFAULT VALUES`).run().lastInsertRowid)
    } catch (error) {
      reject(error)
    }
  })
}