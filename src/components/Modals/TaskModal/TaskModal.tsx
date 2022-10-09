import { useEffect, useState } from "react";
import Modal from "react-modal";
import { api } from "../../../services/api";
import { useTasks } from "../../../services/hooks/useTasks";
import { ITask } from "../../../services/mirage";
import { ModalContainer } from "./styles";

interface ICreateTaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  task: ITask | undefined;
}

export function EditTaskModal({
  isOpen,
  onRequestClose,
  task,
}: ICreateTaskModalProps) {
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const { refetch: refetchTasks } = useTasks();

  const toggleEditMode = () => {
    document.querySelectorAll(".edit-mode").forEach((element) => {
      element.classList.toggle("off");
    });
  };

  function eraseData() {
    setErrorMsg("");
    setNewTaskDescription("");
    refetchTasks();
    return onRequestClose();
  }

  const handleEditTask = async () => {
    try {
      await api.put("/tasks", {
        ...task,
        description: newTaskDescription,
      });
    } catch (e: any) {
      return setErrorMsg(e.response.data.message + "*");
    }

    return eraseData();
  };

  const handleApprove = async () => {
    try {
      await api.put("/tasks", {
        ...task,
        state: "aprovada",
      });
    } catch (e: any) {
      return console.log(e);
    }

    return eraseData();
  };

  const handleReject = async () => {
    try {
      await api.put("/tasks", {
        ...task,
        state: "rejeitada",
      });
    } catch (e: any) {
      return console.log(e);
    }

    return eraseData();
  };

  const handleDeleteTask = async () => {
    try {
      await api.delete(`/tasks/${task?.id}`);
    } catch (e) {
      return console.log(e);
    }

    eraseData();
  };

  useEffect(() => {
    setNewTaskDescription(task?.description || "");
    setErrorMsg("");
  }, [task]);

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
        <p className="task-description edit-mode">{task?.description}</p>
        <textarea
          name="description"
          id="description"
          cols={30}
          rows={10}
          value={newTaskDescription}
          placeholder="Descrição da Tarefa"
          className="edit-mode off"
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />

        <p className="error-msg edit-mode off">{errorMsg}</p>

        {task?.state === "pronta" ? (
          <>
            <div className="approve-section">
              <button
                className="approve-button edit-mode"
                onClick={handleApprove}
              >
                Aprovar
              </button>
              <button
                className="reject-button edit-mode"
                onClick={handleReject}
              >
                Rejeitar
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              className="approve-button edit-mode off"
              onClick={handleEditTask}
            >
              Alterar Tarefa
            </button>
            <button className="edit-button" onClick={toggleEditMode}>
              <span className="edit-mode">Editar</span>
              <span className="edit-mode off">Voltar</span>
            </button>
            <button
              className="reject-button edit-mode"
              onClick={handleDeleteTask}
            >
              Excluir Tarefa
            </button>
          </>
        )}

        <button className="cancel-button" onClick={onRequestClose}>
          Cancelar
        </button>
      </ModalContainer>
    </Modal>
  );
}
