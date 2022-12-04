import { useEffect, useState } from "react";
import { ITask } from "../services/hooks/useTasks";
import { convertMsToTime } from "../services/utils";

interface TaskProps {
    task: ITask,
    handleEditTask: (task: ITask) => void;
}

export function Task({ task, handleEditTask }: TaskProps) {
    const [remainingTime, setRemainingTime] = useState("");
    const [taskState, setTaskState] = useState(task.expiration_date - new Date().getTime() < 0 ? "Atrasada" : "Fazer");

    useEffect(() => {
        setInterval(() => setRemainingTime(convertMsToTime(task.expiration_date - new Date().getTime())), 1000);
    }, [])

    return (
        <div key={task.id} onClick={() => handleEditTask(task)}>
            <div className="task">
                <div className="task-description">
                    <h3>{task.description}</h3>
                </div>
                <div className={`task-state ${task.state}`}>
                    <h3>{taskState}</h3>
                    {taskState === "Fazer" ? ( // Trocar para utilizar informação da API
                        <> [ {task.expiration_date > new Date().getTime() ? remainingTime : ""} ] </>
                    ) : (
                        <p></p>
                    )}
                </div>
                <div className="task-user">
                    <h3>{task.user?.name ? task.user?.name : "---"}</h3>
                </div>
                <div className="task-description">
                    <h3>{task.group?.name ? task.group?.name : "---"}</h3>
                </div>
            </div>
            <hr />
        </div>
    )
}