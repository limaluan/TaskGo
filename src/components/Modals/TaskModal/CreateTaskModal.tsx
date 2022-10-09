import { useEffect, useState } from "react";
import Modal from "react-modal";
import { api } from "../../../services/api";
import {
  getGroups,
  getUsers,
  useEntities,
  useUsers,
} from "../../../services/hooks/useEntities";
import { useTasks } from "../../../services/hooks/useTasks";
import { IEntity } from "../../../services/mirage";
import { LoadingSpinner } from "../../LoadingSpinner/LoadingSpinner";
import { ModalContainer } from "../EntityModals/styles";

interface ICreateTaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function CreateTaskModal({
  isOpen,
  onRequestClose,
}: ICreateTaskModalProps) {
  const { data: entities } = useEntities();
  const {
    data: users,
    refetch: refetchUsers,
    isLoading: isUsersLoading,
    error: usersError,
  } = useUsers();
  const { refetch: refetchTasks } = useTasks();

  let [groups, setGroups] = useState<IEntity[]>([]);

  const [errorMsg, setErrorMsg] = useState("");

  // Formulário da Tarefa
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [minutes, setMinutes] = useState("");

  const setGroupActive = (groupId: string) => {
    document.querySelectorAll(".group-card").forEach((card) => {
      card.classList.remove("selected");
    });

    setGroupId(groupId);
    document.querySelector(`#group-${groupId}`)?.classList.add("selected");
  };

  const setUserActive = (userId: string) => {
    document.querySelectorAll(".user-card").forEach((card) => {
      card.classList.remove("selected");
    });

    setUserId(userId);
    document.querySelector(`#user-${userId}`)?.classList.add("selected");
  };

  const handleSubmit = async () => {
    const task = {
      description,
      user_id: userId,
      group_id: groupId,
      created_at: new Date(),
      time_to_finish: minutes,
    };

    try {
      await api.post("/tasks", task);
    } catch (e: any) {
      return setErrorMsg(e.response.data.message + "*");
    }

    console.log(task);
    setGroupId("");
    setUserId("");
    setDescription("");
    refetchTasks();
    return onRequestClose();
  };

  useEffect(() => {
    getGroups().then((groupsData) => setGroups(groupsData));

    refetchUsers();
  }, [entities]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <ModalContainer>
        <h1>Criar Tarefa</h1>
        <input
          type="text"
          placeholder="Descrição da tarefa*"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Minutos para finalizar*"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />

        {/* Seção para selecionar Grupo */}
        <h2>Selecione um grupo para a tarefa:*</h2>
        <section className="select-section">
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
        <h2>Designe um usuário para tarefa:</h2>
        <section className="select-section">
          <div className="wrapper">
            {isUsersLoading ? (
              <LoadingSpinner />
            ) : usersError ? (
              <h1>Não foi possível carregar os usuários.</h1>
            ) : users && users.length >= 1 ? (
              <>
                {users
                  .filter((user) => user.group.id === groupId)
                  .map((user) => (
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
        <p className="error-msg">{errorMsg}</p>
        <button className="create-button" onClick={handleSubmit}>
          <i className="material-icons">add</i>
          Criar Tarefa
        </button>
      </ModalContainer>
    </Modal>
  );
}
