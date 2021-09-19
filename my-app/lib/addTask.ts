import db from './db'
import ranStr from './randomString'

const setTask = async (name: string, description: (string | null), deadline: (string | null)) => {
    const id = ranStr(32);
    let res;
    if (typeof deadline !== "string" && typeof description !== "string") {
        res = await db("INSERT INTO tasks (id,isFinished,task_name) VALUES (?, ?, ?)", [id, 0, name]);
    }
    if (typeof deadline !== "string" && typeof description === "string") {
        res = await db("INSERT INTO tasks (id,isFinished,task_name,task_text) VALUES (?, ?, ?, ?)", [id, 0, name, description]);
    }
    if (typeof deadline === "string" && typeof description !== "string") {
        res = await db("INSERT INTO tasks (id,isFinished,name,deadline) VALUES (?, ?, ?, ?)", [id, 0, name, deadline]);
    }
    if (typeof deadline === "string" && typeof description === "string") {
        res = await db("INSERT INTO tasks VALUES (?, ?, ?, ?, ?)", [id, 0, name, description, deadline]);
    }
    return res;
}

export default setTask;