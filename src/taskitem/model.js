
import connectDatabase from "../database.js";

export async function addTaskItem(requestBody) {

  const query = `
      INSERT INTO todo_task_items (description, start_date,end_date,status,created_by,assigned_to,task_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *;
    `;
  /**default value for status is open while creating a new task if the input is not given */

  const values = [requestBody.description, requestBody.start_date, requestBody.end_date,
  requestBody.status ?? 'open', requestBody.created_by, requestBody.assigned_to, requestBody.task_id];

  const response = await connectDatabase(query, values);
  // console.log("response data from db is :", response)
  if (response.success == false) {
    response.code = 204
    return response;

  } else {

    if (response.data.length > 0) {
      return { success: true, code: 205, data: response.data[0] }
    } else {
      return { success: false, code: 206, message: "Failed to create task item" } //
    }
  }
}

// description VARCHAR(200),
//     start_date DATE,
//     end_date DATE NULL,
//     status task_item_status NOT NULL default 'open',
//     created_at TIMESTAMPTZ default NOW() ,
//     created_by INT references todo_users(id),
//     assigned_to INT references todo_users(id)

export async function taskItemUpdate(queryString, taskItemId) {

  let query = ` UPDATE todo_task_items SET ${queryString} where id = ${taskItemId} RETURNING*;`
  //console.log(query);
  const response = await connectDatabase(query);

  if (response.success == false) {
    response.code = 113;
    return response;
  } else {
    if (response.data.length > 0) {
      return { success: true, code: 114, data: response.data[0] }
    } else {
      return { sucess: true, code: 115, message: "No task items found" }
    }
    //return response;
  }
}

/** get task items by id */

export async function fetchTaskItemById(id) {
  const query = ` SELECT * FROM todo_task_items where id = $1;`;
  const values = [id]
  const response = await connectDatabase(query, values);
  // console.log("Doing fetch task by id")
  // console.log(response)
  if (response.success == false) {
    response.code = 107;
    return response;
  } else {
    if (response.data.length > 0) {
      return { success: true, code: 108, data: response.data[0] }
    } else {
      return { sucess: true, code: 109, message: "Unable to find the task item" }
    }
  }

  //console.log(response);
  //return response;

}

/** Get all task items or with filters from task_items_ table */

export async function fetchTaskItems(queryString) {
  let query = ` select * from todo_task_items ${queryString};`
  // console.log(query);
  const response = await connectDatabase(query);

  if (response.success == false) {
    response.code = 110;
    return response;
  } else {
    if (response.data.length > 0) {
      return { success: true, code: 111, data: response.data }
    } else {
      return { sucess: true, code: 112, message: "No task items found" }
    }
    //return response;
  }
}


/** deleteTaskById function connects to db and runs query to delete the from the table todo_task for the give task id */

export async function deleteTaskItemById(id) {
  const query = `DELETE FROM todo_task_items WHERE id = $1;`;
  const values = [id]
  const response = await connectDatabase(query, values);
  // console.log("response data from db is :", response)
  if (response.success == false) {
    response.code = 116;
    return response;
  } else {
    // console.log("response data is :", response.data)
    if (response.rowcount > 0) {
      return { success: true, code: 117, data: response.rowcount }
    } else {
      return { sucess: true, code: 118, message: "Unable to find the task item" }
    }
  }
}
