import { NextApiHandler } from "next";
import Rows from '../../interfaces/rows'
import getTasks from '../../lib/getTasks'
import setTask from '../../lib/addTask'

type Data = {
    status: string,
}

const task: NextApiHandler = async (req, res) => {
    if (req.method == "GET") {
        try {
            const result = await getTasks();
            res.status(200).json(result)
        } catch (err) {
            console.error(err);
            res.status(400).json({ status: "failed" })
        }
    }
    if (req.method == "POST") {
        let data = req.body;
        try {
            await setTask(data.name, data.description, data.deadline);
            res.status(200).json({ status: "success" })
        } catch (err) {
            console.error(err);
            res.status(400).json({ status: "failed" })
        }
    }
}

export default task;