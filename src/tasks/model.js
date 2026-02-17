import { connect } from "http2";
import connectDatabase from "../database.js";

/** addTask function connects to db and runs insert query to enter new row of data into the table todo_task */

export async function addTask(requestBody) {
  const query = `
      INSERT INTO todo_task (task_name, start_date,end_date,status,created_by)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *;
    `;
  /**default value for status is open while creating a new task if the input is not given */

  const values = [requestBody.task_name, requestBody.start_date, requestBody.end_date,
  requestBody.status ?? 'open', requestBody.created_by];

  const response = await connectDatabase(query, values);

  if (response.success == false) {
    response.code = 104
    return response;

  } else {
    //console.log("response data from db is :",response)
    if (response.data.length > 0) {
      return { success: true, code: 105, data: response.data[0] }
    } else {
      return { success: false, code: 106, message: "Failed to create task" } //
    }
  }

}

/** fetchTaskById function connects to db and runs query to fetch task details for the given id from the table todo_task */

export async function fetchTaskById(id) {
  const query = ` SELECT * FROM todo_task where id = $1;`;
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
      return { sucess: true, code: 109, message: "Unable to find the task" }
    }
  }

  //console.log(response);
  //return response;

}

/** fetchTasks function connects to db and runs query to fetch all task details from the table todo_task */

export async function fetchTasks(queryString) {
  let query = ` select * from todo_task ${queryString};`
  // console.log(query);
  const response = await connectDatabase(query);

  if (response.success == false) {
    response.code = 110;
    return response;
  } else {
    if (response.data.length > 0) {
      return { success: true, code: 111, data: response.data }
    } else {
      return { sucess: true, code: 112, message: "No tasks found" }
    }
    //return response;
  }
}

/** taskUpdate function connects to db and runs query to update task details in the table todo_task for the give task id */

export async function taskUpdate(queryString, taskId) {

  let query = ` UPDATE todo_task SET ${queryString} where id = ${taskId} RETURNING*;`
  //console.log(query);
  const response = await connectDatabase(query);

  if (response.success == false) {
    response.code = 113;
    return response;
  } else {
    if (response.data.length > 0) {
      return { success: true, code: 114, data: response.data[0] }
    } else {
      return { sucess: true, code: 115, message: "No tasks found" }
    }
    //return response;
  }
}

/** deleteTaskById function connects to db and runs query to delete the from the table todo_task for the give task id */

export async function deleteTaskById(id) {
  const query = `DELETE FROM todo_task WHERE id = $1;`;
  const values = [id]
  const response = await connectDatabase(query, values);
  console.log("response data from db is :", response)
  if (response.success == false) {
    response.code = 116;
    return response;
  } else {
    // console.log("response data is :", response.data)
    if (response.rowcount > 0) {
      return { success: true, code: 117, data: response.rowcount }
    } else {
      return { sucess: true, code: 118, message: "Unable to find the task" }
    }
  }
}
//console.log(response);
//return response;
