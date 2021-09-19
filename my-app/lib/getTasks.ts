import db from './db'

const getTasks = async () => {
    const res: any = await db("SELECT * FROM tasks");
    const ret = res.map((x: any) => {
        return {
            "id": x['id'],
            "isFinished": x['isFinished'] != 0,
            "name": x['task_name'],
            "description": x['task_text'],
            "deadline": x['deadline']
        }
    })
    return ret;
}

export default getTasks;