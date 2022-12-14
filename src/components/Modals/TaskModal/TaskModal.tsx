import { useEffect, useState } from "react";
import Modal from "react-modal";
import { api } from "../../../services/api";
import { ITask, useTasks } from "../../../services/hooks/useTasks";
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

  // Ativa e desativa as op;cões de editar
  const toggleEditMode = () => {
    document.querySelectorAll(".edit-mode").forEach((element) => {
      element.classList.toggle("off");
    });
  };

  // Apaga todos os dados do formulário
  function eraseData() {
    setErrorMsg("");
    setNewTaskDescription("");
    refetchTasks();
    return onRequestClose();
  }

  // Realiza o PUT da tarefa depois do Submit
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

  // Realiza o PUT da tarefa depois do Submit, deixando-a como APROVADA
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

  // Realiza o PUT da tarefa depois do Submit, deixando-a como REPROVADA
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

  // Realiza o DELETE da tarefa depois do Submit
  const handleDeleteTask = async () => {
    try {
      await fetch(`http://localhost:3000/api/task`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task?.id)
      }).then(response => response.json())
    } catch (e) {
      return console.log(e);
    }

    eraseData();
  };

  useEffect(() => {
    // Inicializa os campos do modal com as propriedades da tarefa selecionada
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
        {/* Form do Modal */}
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

        {/* Se o Estado da tarefa for pronto, mostra as opções de APROVAR ou REJEITAR */}
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
