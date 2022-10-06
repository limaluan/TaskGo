import { useEffect, useState } from "react";
import Modal from "react-modal";
import { api } from "../../../services/api";
import { getGroups, getUsers } from "../../../services/hooks/useEntities";
import { useTasks } from "../../../services/hooks/useTasks";
import { IEntity, ITask } from "../../../services/mirage";
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
  const [newUserId, setNewUserId] = useState("");
  const [newGroupId, setNewGroupId] = useState("");

  let [groups, setGroups] = useState<IEntity[]>([]);
  let [users, setUsers] = useState<IEntity[]>([]);

  const [errorMsg, setErrorMsg] = useState("");

  const { refetch: refetchTasks } = useTasks();
  
  const setGroupActive = (groupId: string) => {
    document.querySelectorAll(".group-card").forEach((card) => {
      card.classList.remove("selected");
    });

    setNewGroupId(groupId);
    document.querySelector(`#group-${groupId}`)?.classList.add("selected");
  };

  const setUserActive = (userId: string) => {
    document.querySelectorAll(".user-card").forEach((card) => {
      card.classList.remove("selected");
    });

    setNewUserId(userId);
    document.querySelector(`#user-${userId}`)?.classList.add("selected");
  };

  const toggleEditMode = () => {
    document.querySelectorAll(".edit-mode").forEach((element) => {
      element.classList.toggle("off");
    });
  };

  const handleEditTask = async () => {
    try {
      await api.put("/tasks", {
        ...task,
        description: newTaskDescription,
        user_id: newUserId,
        group_id: newGroupId,
      });
    } catch (e: any) {
      return setErrorMsg(e.response.data.message + "*");
    }

    setErrorMsg("");
    setNewGroupId("");
    setNewTaskDescription("");
    setNewUserId("");
    refetchTasks();
    return onRequestClose();
  };

  useEffect(() => {
    setNewTaskDescription(task?.description || "");
    getGroups().then((groupsData) => setGroups(groupsData));
    getUsers().then((entitiesData) => setUsers(entitiesData));
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

        {/* Seção para selecionar Grupo */}
        <h2 className="edit-mode off">Selecione um grupo para a tarefa:*</h2>
        <section className="select-section edit-mode off">
          <div className="wrapper">
            {groups.length >= 1 ? (
              <>
                {groups.map((group) => (
                  <div
                    className="group-card"
                    key={group.id}
                    id={`group-${group.id}`}
                    onClick={() => setGroupActive(group.id)}
                  >
                    <i className="material-icons">group</i>
                    <span>{group.name}</span>
                  </div>
                ))}
              </>
            ) : (
              <h1 style={{ padding: "1rem 0" }}>Não há grupos cadastrados.</h1>
            )}
          </div>
        </section>
        {/* Seção para selecionar usuário */}
        <h2 className="edit-mode off">Designe um usuário para tarefa:</h2>
        <section className="select-section edit-mode off">
          <div className="wrapper">
            {users.length >= 1 ? (
              <>
                {users.map((user) => (
                  <div
                    className="user-card"
                    key={user.id}
                    id={`user-${user.id}`}
                    onClick={() => setUserActive(user.id)}
                  >
                    <i className="material-icons">account_circle</i>
                    <span>{user.name}</span>
                  </div>
                ))}
              </>
            ) : (
              <h1 style={{ padding: "1rem 0" }}>
                Não há usuários cadastrados.
              </h1>
            )}
          </div>
        </section>
        <p className="error-msg edit-mode off">{errorMsg}</p>

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
        <div className="approve-section">
          <button className="approve-button edit-mode">Aprovar</button>
          <button className="reject-button edit-mode">Rejeitar</button>
        </div>
        <button className="cancel-button" onClick={onRequestClose}>
          Cancelar
        </button>
      </ModalContainer>
    </Modal>
  );
}
