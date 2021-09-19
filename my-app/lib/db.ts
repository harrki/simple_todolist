import mysql from 'mysql2/promise'

const db = async (query: string, value: (string | number)[] | string | number = []) => {
    const connection = await mysql.createConnection({ host: "db", user: "root", password: "root", database: "todolist_database" });
    const [row, fields] = await connection.execute(query, value);
    await connection.end();
    return row;
}

export default db;