import db from './db'

const editTask = async (id: string, isFinished: (boolean | null), name: (string | null), description: (string | null), deadline: (string | null)) => {
    if (typeof isFinished === "boolean") {
        await db("UPDATE tasks SET isFinished=? WHERE id=?", [(isFinished) ? 1 : 0, id]);
    }
    if (typeof name === "string") {
        await db("UPDATE tasks SET task_name=? WHERE id=?", [name, id]);
    }
    if (typeof description === "string") {
        await db("UPDATE tasks SET task_text=? WHERE id=?", [description, id]);
    }
    if (typeof deadline === "string") {
        await db("UPDATE tasks SET deadline=? WHERE id=?", [deadline, id]);
    }
}

export default editTask;