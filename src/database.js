
/** this file handles the connection to db and handles the response from DB  ,
 *  a structured response is sent back to the function that calls this db connection */

import { Client } from 'pg';

export default async function connectDatabase(query, values) {
    const client = new Client({
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres',
        database: 'todo_application',
    });

    return await client.connect().then(() => {
        // console.log('Connected to PostgreSQL database.');

        return client.query(query, values);

    })
        .then((res) => {
            // console.log('Tables updated successfully');
            //console.log('response of query', res)
            return { success: true, data: res.rows, rowcount: res.rowCount }

        })
        .catch(err => {
            console.error('Error:', err);
            return { success: false, message: err.message }
        })
        .finally(() => {
            client.end();
        });
};
