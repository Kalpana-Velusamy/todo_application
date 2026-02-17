import { addTaskItem, taskItemUpdate, fetchTaskItemById, fetchTaskItems, deleteTaskItemById } from './model.js'

export async function createTaskItem(req, res) {
    req.body.created_by = req.user.id
    const taskItem = await addTaskItem(req.body);

    if (taskItem.code == 205) {
        // console.log(task);
        return res.send({ "message": " Task item created succuessfully", data: taskItem.data })
    } else {
        if (taskItem.code == 206) {
            return res.status(400).send({ "message": " Task item not created" })
        }
        // console.log(task);
        return res.status(400).send({ "message": " Something went wrong. verify the request data" })
    }
}


export async function updateTaskItem(req, res) {

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
    const response = await taskItemUpdate(queryString, taskId);

    if (response.code == 113) {
        // console.log(task);
        return res.status(400).send({ "message": "Soemthing went wrong ", data: response.message })

    } else if (response.code == 114) {
        // console.log(task);
        return res.send({ "message": "Task Item updated", data: response.data })

    } else {
        return res.status(404).send({ "message": response.message })
    }


}

/** gets taks item details by id from db*/

export async function getTaskItemById(req, res) {
    const task = await fetchTaskItemById(req.params.id)
    if (task.code == 107) {
        // console.log(task);
        return res.status(400).send({ "message": " Soemthing went wrong ", data: task.message }) /** if query fails */
    } else if (task.code == 108) {
        // console.log(task);
        return res.send({ "message": " Task Items Identified", data: task.data }) /** query sucess and data present */
    } else {
        return res.status(404).send({ "message": " Task Item not Found" })  /** query sucess but no data */
    }

}

/**Get all task items / or with fiters */

export async function getTaskItems(req, res) {
    /** setting up query string required */
    let queryString = "";
    if (req.query.status) {
        queryString = `where status = '${req.query.status}'`
    }

    //console.log(queryString.status)
    const tasks = await fetchTaskItems(queryString)


    if (tasks.code == 110) {
        // console.log(task);
        return res.status(400).send({ "message": "Soemthing went wrong ", data: tasks.message })
    } else if (tasks.code == 111) {
        // console.log(task);
        return res.send({ "message": "Task Items Identified", data: tasks.data })
    } else {
        return res.status(404).send({ "message": tasks.message })
    }

    //console.log(tasks);
    // return res.send(tasks)
}


/** deleting an exisiting task item from the task item table*/

export async function deleteTaskItem(req, res) {
    const result = await deleteTaskItemById(req.params.id)

    if (result.code == 116) {
        // console.log(task);
        return res.status(400).send({ "message": " Soemthing went wrong ", data: result.message })
    } else if (result.code == 117) {
        // console.log(task);
        return res.send({ "message": " Rows Deleted Successfully", "number of rows deleted": result.data })
    } else {
        return res.status(404).send({ "message": " Task item not Found" })
    }
    // res.send(task);
}
