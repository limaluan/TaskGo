import { FormEvent, useEffect, useState } from "react";
import Modal from "react-modal";
import {
  getGroups,
  IEntity,
  useEntities,
  useUsers,
} from "../../../services/hooks/useEntities";
import { useTasks } from "../../../services/hooks/useTasks";
import { LoadingSpinner } from "../../LoadingSpinner/LoadingSpinner";
import { ModalContainer } from "../EntityModals/styles";

interface ICreateTaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

interface ISetUserActive {
  userId: string;
  userName: string;
}

interface ISetGroupActive {
  groupId: string;
  groupName: string;
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
  const [userName, setUserName] = useState("");
  const [groupId, setGroupId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Define qual GRUPO foi selecionado
  const setGroupActive = ({ groupId, groupName }: ISetGroupActive) => {
    document.querySelectorAll(".group-card").forEach((card) => {
      card.classList.remove("selected");
    });

    setGroupId(groupId);
    setGroupName(groupName);
    document.querySelector(`#group-${groupId}`)?.classList.add("selected");
  };

  // Define qual USUÁRIO foi selecionado
  const setUserActive = ({ userId, userName }: ISetUserActive) => {
    document.querySelectorAll(".user-card").forEach((card) => {
      card.classList.remove("selected");
    });

    setUserId(userId);
    setUserName(userName);
    document.querySelector(`#user-${userId}`)?.classList.add("selected");
  };

  // Faz o POST da Tarefa após o Submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const iso = date + "T" + time + ":00";
    const expirationDate = new Date(iso);

    const task = {
      description,
      id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())), // Generates a ID
      user: {
        id: userId,
        name: userName,
      },
      group: { id: groupId, name: groupName },
      created_at: new Date().getTime(),
      expiration_date: expirationDate.getTime(),
    };

    const response = await fetch('http://localhost:3000/api/task', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    }).then(response => response.json())

    if (response.error) {
      return setErrorMsg(response.error);
    }

    setErrorMsg("");
    setGroupId("");
    setUserId("");
    setDescription("");
    refetchTasks();
    return onRequestClose();
  };

  useEffect(() => {
    // Toda vez que é inicializado obtém a lista de grupos
    getGroups().then((groupsData) => setGroups(groupsData));
    refetchUsers(); // Atualiza a lista de usuários
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
        {/* Formulário da Tarefa */}
        <h1>Criar Tarefa</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Descrição da tarefa*"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <h1>Data de Expiração*</h1>
          <div style={{ display: "flex", gap: "2rem" }}>
            <input
              type="date"
              placeholder="Data para finalizar"
              value={date}
              min={new Date().toLocaleDateString("af-ZA")}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <input
              type="time"
              placeholder="Horario para finalizar"
              value={time}
              min={
                new Date(date).getDate() + 1 === new Date().getDate()
                  ? new Date().getHours().toLocaleString() + ":" + new Date().getMinutes().toLocaleString()
                  : ""
              }
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

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
                      onClick={() => setGroupActive({ groupId: group.id, groupName: group.name })}
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
          {groupId !== "" && (
            <>
              <h2>
                Designe um usuário para tarefa: <br /> Opcional
              </h2>
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
                            onClick={() => setUserActive({ userId: user.id, userName: user.name })}
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
            </>
          )}

          <p className="error-msg">{errorMsg}</p>
          <button type="submit" className="create-button">
            <i className="material-icons">add</i>
            Criar Tarefa
          </button>
        </form>
      </ModalContainer>
    </Modal>
  );
}
