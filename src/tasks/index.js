/** importing required functions task related functionalities from model.js of tasks folder */

import { addTask, fetchTaskById, fetchTasks, taskUpdate, deleteTaskById } from './model.js';


/**Create task function handles request body data and creates task in todo_task table */

export async function createTask(req, res) {
    req.body.created_by = req.user.id
    const task = await addTask(req.body);

    if (task.code == 105) {
        // console.log(task);
        return res.send({ "message": " Task created succuessfully", data: task.data })
    } else {
        // console.log(task);
        return res.status(400).send({ "message": " Failed to create task" })
    }
}

/** gets taks details by id from db*/

export async function getTaskById(req, res) {
    const task = await fetchTaskById(req.params.id)
    if (task.code == 107) {
        // console.log(task);
        return res.status(400).send({ "message": " Soemthing went wrong ", data: task.message }) /** if query fails */
    } else if (task.code == 108) {
        // console.log(task);
        return res.send({ "message": " Task Identified", data: task.data }) /** query sucess and data present */
    } else {
        return res.status(404).send({ "message": " Task not Found" })  /** query sucess but no data */
    }

}

/** gets all taks details  from db*/

export async function getTasks(req, res) {
    /** setting up query string required */
    let queryString = "";
    if (req.query.status) {
        queryString = `where status = '${req.query.status}'`
    }

    //console.log(queryString.status)
    const tasks = await fetchTasks(queryString)


    if (tasks.code == 110) {
        // console.log(task);
        return res.status(400).send({ "message": "Soemthing went wrong ", data: tasks.message })
    } else if (tasks.code == 111) {
        // console.log(task);
        return res.send({ "message": "Tasks Identified", data: tasks.data })
    } else {
        return res.status(404).send({ "message": tasks.message })
    }

    //console.log(tasks);
    // return res.send(tasks)
}

/** updating details for an exisiting task*/

export async function updateTask(req, res) {

    //let queryString = req.body
    let bodyValues = Object.values(req.body);
    let queryString = ""
    let numOfBody = Object.keys(req.body).length
    let bodyKeys = Object.keys(req.body)

    // console.log(bodyKeys[0])

    for (var i = 0; i < numOfBody; i++) {
        queryString += `${bodyKeys[i]} = '${bodyValues[i]}'`;
        // console.log(queryString)
        if (i !== (numOfBody - 1)) {
            queryString += ","
        }
    }
    // console.log("Finaly query string is :", queryString, queryValues)

    const taskId = req.params.id                                                                    /** fetching task id from url parameter */
    const response = await taskUpdate(queryString, taskId);

    if (response.code == 113) {
        // console.log(task);
        return res.status(400).send({ "message": "Soemthing went wrong ", data: response.message })

    } else if (response.code == 114) {
        // console.log(task);
        return res.send({ "message": "Tasks Identified", data: response.data })

    } else {
        return res.status(404).send({ "message": response.message })
    }


}

/** deleting an exisiting task from the table*/

export async function deleteTask(req, res) {
    const result = await deleteTaskById(req.params.id)

    if (result.code == 116) {
        // console.log(task);
        return res.status(400).send({ "message": " Soemthing went wrong ", data: result.message })
    } else if (result.code == 117) {
        // console.log(task);
        return res.send({ "message": " Rows Deleted Successfully", "number of rows deleted": result.data })
    } else {
        return res.status(404).send({ "message": " Task not Found" })
    }
    // res.send(task);
}
