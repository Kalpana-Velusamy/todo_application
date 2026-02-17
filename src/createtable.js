/** Using this file to create new tables for the first time */

import { Client } from 'pg';

const client = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'postgres',
    database: 'todo_application',
});

client.connect().then(() => {
    console.log('Connected to PostgreSQL database.');

    // const createTableQuery = `
    // CREATE TABLE IF NOT EXISTS todo_users (id SERIAL PRIMARY KEY,
    // name VARCHAR(100),
    // email VARCHAR(100) UNIQUE,
    // password varchar(100),
    // created_at date)`;

    // const createTableQuery = `
    // CREATE TYPE IF NOT EXISTS task_status as enum ('open','pending','in_progress','completed');

    // CREATE TABLE IF NOT EXISTS todo_task (id SERIAL PRIMARY KEY,
    // task_name VARCHAR(100),
    // start_date DATE,
    // end_date DATE NULL,
    // status task_status NOT NULL default 'open',
    // created_at TIMESTAMPTZ default NOW() ,
    // created_by INT references todo_users(id)
    // );`;

    //const createTypeQuery = `CREATE TYPE task_item_status AS ENUM ('open', 'pending', 'in_progress', 'completed');`;

    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS todo_task_items (id SERIAL PRIMARY KEY,
    description VARCHAR(200),
    start_date DATE,
    end_date DATE NULL,
    status task_item_status NOT NULL default 'open',
    created_at TIMESTAMPTZ default NOW() ,
    created_by INT references todo_users(id),
    assigned_to INT references todo_users(id)
    );`;

    return client.query(createTableQuery);

})
    .then(() => {
        console.log('Table created or alreay exists');
    })
    .catch(err => {
        console.error('Error:', err);

    })
    .finally(() => {
        client.end();
    });
