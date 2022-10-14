import { useContext } from "react";
import Modal from "react-modal";
import { UserContext } from "../../../contexts/UserContext";
import { api } from "../../../services/api";
import { useTasks } from "../../../services/hooks/useTasks";
import { ITask } from "../../../services/mirage";
import { ModalContainer } from "../TaskModal/styles";

interface ICreateEntityModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  task: ITask;
}

export function GroupTaskModal({
  isOpen,
  onRequestClose,
  task,
}: ICreateEntityModalProps) {
  const { user } = useContext(UserContext);
  const { refetch: refetchTasks } = useTasks();

  const handleAssociateTask = async () => {
    try {
      await api.put("/tasks", {
        ...task,
        user: { id: user.id, name: user.name },
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
        <h1>
          Tarefa <span>{task?.state}</span>
        </h1>
        <b className="task-description">Descrição:</b>
        <p className="task-description">{task?.description}</p>

        {/* Se a tarefa não tiver usuário associado e o estado for "fazer" */}
        {!task.user?.id && task.state !== "fazer" && (
          <button onClick={handleAssociateTask} className="approve-button">
            Associar
          </button>
        )}
        <button onClick={onRequestClose} className="cancel-button">
          Voltar
        </button>
      </ModalContainer>
    </Modal>
  );
}
