import { NextApiHandler } from "next";
import deleteTask from "../../../lib/deleteTask";
import editTask from "../../../lib/editTask";
import getTaskInfo from "../../../lib/getTaskInfo";

const taskId: NextApiHandler = async (req, res) => {
    const { pid } = req.query;
    if (typeof pid === "string") {
        if (req.method === "GET") {
            try {
                const result = await getTaskInfo(pid);
                res.status(200).json(result);
            } catch (err) {
                console.error(err);
                res.status(400).json({ status: "failed" });
            }
        }
        if (req.method === "POST") {
            const data = req.body;
            try {
                await editTask(pid, data.isFinished, data.name, data.description, data.deadline);
                res.status(200).json({ status: "success" });
            } catch (err) {
                console.error(err);
                res.status(400).json({ status: "failed" });
            }
        }
        if(req.method === "DELETE"){
            try {
                await deleteTask(pid);
                res.status(200).json({ status: "success" });
            } catch (err) {
                console.error(err);
                res.status(400).json({ status: "failed" });
            }
        }
    } else {
        res.status(400).json({ status: "failed" })
    }
}

export default taskId;