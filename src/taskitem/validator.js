import { fetchTaskById } from '../tasks/model.js'
import { getUserByID } from '../users/model.js'
export async function createTaskItemPayloadValidation(req, res, next) {
    const requestBody = req.body;
    if (!requestBody.description) {
        return res.status(409).send({ message: "Task item description cannot be empty" });
    }
    if (!req.body.start_date) {
        let currentDate = new Date();
        req.body.start_date = currentDate;
    }
    if (requestBody.status) {
        const statusArray = ['open', 'in_progress', 'pending'];

        if (!statusArray.includes(requestBody.status)) {
            return res.status(409).send({ message: "Invalid Task status" });
        }
    }
    // console.log("after this validating task id")
    if (!requestBody.task_id) {
        return res.status(409).send({ message: "task id cannot be empty" });
    } else {
        const task_id_valid = await fetchTaskById(requestBody.task_id);
        // console.log(task_id_valid)
        if (task_id_valid.code == 109) {
            return res.status(400).send({ message: "Invalid task id" });
        }

    }
    next()
}

// INSERT INTO todo_task_items (description, start_date,end_date,status,created_by,assigned_to,task_id)
//       VALUES ($1,$2,$3,$4,$5,$6,$7)
//       RETURNING *;


export async function updateTaskItemPayloadValidation(req, res, next) {
    const requestBody = req.body;

    if (requestBody.status) {
        const statusArray = ['open', 'in_progress', 'pending', 'completed'];

        if (!statusArray.includes(requestBody.status)) {
            return res.status(409).send({ message: "Invalid Task Item status" });
        }
    }
    // console.log("after this validating task id")
    if (requestBody.task_id) {
        const task_id_valid = await fetchTaskById(requestBody.task_id);
        // console.log(task_id_valid)
        if (task_id_valid.code == 109) {
            return res.status(400).send({ message: "Invalid task id" });
        }

    }
    if (requestBody.assigned_to) {

        const assigned_to_valid = await getUserByID(requestBody.assigned_to);
        if (assigned_to_valid.code == 101) {
            return res.status(400).send({ message: "Invalid user id to assign" });

        } else {
            if (assigned_to_valid.code == 102) {
                return res.status(400).send({ message: "something went wrong. cannot assign to user" });
            }

        }
    }
    next()
}
