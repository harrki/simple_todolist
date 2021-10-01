import db from './db'

const deleteTask = async (id:string) => {
    await db("DELETE from tasks WHERE id=?", [id]);
}

export default deleteTask;