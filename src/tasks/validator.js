
/** this validator.js handles payload validtions for task releated apis */

/** createTaskPayloadValidation validates the inputs for creating a new task
 * task name expected to be non empty
 * if start date is empty current date is taken by default
 * status value is expected to be within the list given
 * once validation is successful create task will be called as we used next()
 */

export async function createTaskPayloadValidation(req, res, next) {
    const requestBody = req.body;
    if (!requestBody.task_name) {
        return res.status(409).send({ message: "Invalid task name" });
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
    next()
}

/** updateTaskPayloadValidation handles the input validation to update existing task
 * if status value is exist in request , it should be within the list of values
 * once this validation is pass , upate task will be executed - (nex() used)
*/
export async function updateTaskPayloadValidation(req, res, next) {

    const requestBody = req.body;

    if (requestBody.status) {
        const statusArray = ['open', 'in_progress', 'pending', 'completed'];

        if (!statusArray.includes(requestBody.status)) {
            return res.status(409).send({ message: "Invalid Task status" });
        }
    }
    next()
}
