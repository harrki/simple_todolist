import db from './db';

const getTaskInfo = async (id: string) => {
    const res: any = await db("SELECT * FROM tasks WHERE id=?", [id]);
    const ret = {
        "id": res[0]['id'],
        "isFinished": res[0]['isFinished'] != 0,
        "name": res[0]['task_name'],
        "description": res[0]['task_text'],
        "deadline": res[0]['deadline']
    }
    return ret;
}

export default getTaskInfo;