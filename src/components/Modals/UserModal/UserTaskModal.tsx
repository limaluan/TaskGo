import Modal from "react-modal";
import { api } from "../../../services/api";
import { useTasks } from "../../../services/hooks/useTasks";
import { ITask } from "../../../services/mirage";
import { ModalContainer } from "../TaskModal/styles";

interface ICreateEntityModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  task: ITask;
}

export function UserTaskModal({
  isOpen,
  onRequestClose,
  task,
}: ICreateEntityModalProps) {
  const { refetch: refetchTasks } = useTasks();
  
  const handleDoingTask = async () => {
    try {
      await api.put("/tasks", {
        ...task,
        state: "fazendo",
      });
    } catch (e: any) {}

    refetchTasks();
    return onRequestClose();
  };


  const handleDoneTask = async () => {
    try {
      await api.put("/tasks", {
        ...task,
        state: "pronta",
      });
    } catch (e: any) {}

    refetchTasks();
    return onRequestClose();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <ModalContainer>
        <h1>Tarefa</h1>
        <b className="task-description">Descrição:</b>
        <p className="task-description edit-mode">{task?.description}</p>

        {task?.state === "fazer" ? (
          <>
            <button className="approve-button" onClick={handleDoingTask}>
              Associar
            </button>
          </>
        ) : task.state === "fazendo" ? (
          <>
            <button
              className="approve-button"
              onClick={handleDoneTask}
            >
              Finalizar Tarefa
            </button>
          </>
        ) : (
          <></>
        )}
        <>
          <button className="cancel-button" onClick={onRequestClose}>
            Voltar
          </button>
        </>
      </ModalContainer>
    </Modal>
  );
}
