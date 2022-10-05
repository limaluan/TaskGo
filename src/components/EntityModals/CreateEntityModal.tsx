import { ChangeEvent, useEffect, useState } from "react";
import Modal from "react-modal";
import { api } from "../../services/api";
import { useEntities, getGroups } from "../../services/hooks/useEntities";
import { IEntity } from "../../services/mirage";
import { CreateEntityContainer } from "./styles";

interface ICreateEntityModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function CreateEntityModal({
  isOpen,
  onRequestClose,
}: ICreateEntityModalProps) {
  const { data, refetch } = useEntities();

  let [groups, setGroups] = useState<IEntity[]>([]);

  useEffect(() => {
    getGroups().then((groupsData) => setGroups(groupsData));
  }, [data]);

  // Ativa e desativa a seção de selecionar Grupos ao trocar de tipo de entidade
  const handleEntityTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
    document.querySelector(".group-section")?.classList.toggle("off");
    document.querySelector("#group-section-title")?.classList.toggle("off");
    document.querySelector("#id")?.classList.toggle("off");
  };

  // Define qual grupo foi selecionado
  const setGroupActive = (groupId: string) => {
    document.querySelectorAll(".group-card").forEach((card) => {
      card.classList.remove("selected");
    });

    setGroupId(groupId);
    document.querySelector(`#card-${groupId}`)?.classList.add("selected");
  };

  // Faz o post da Entidade
  const handleSubmit = async () => {
    const entity: Partial<IEntity> = {
      name,
      type,
      id: type === "group" ? Math.ceil(Math.random() * 1000).toString() : id,
      group: type === "group" ? undefined : groupId,
    };

    try {
      await api.post("/entities", entity);
    } catch (e: any) {
      return setCreateErrorMsg(e.response.data.message + "*");
    }

    setName("");
    setType("user");
    setId("");
    setGroupId("");
    getGroups().then((groupsData) => setGroups(groupsData));
    setCreateErrorMsg("");
    refetch();
    return onRequestClose();
  };

  // Formulário da Entidade
  const [name, setName] = useState("");
  const [type, setType] = useState("user");
  const [id, setId] = useState("");
  const [groupId, setGroupId] = useState("");

  const [createErrorMsg, setCreateErrorMsg] = useState("");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <CreateEntityContainer>
        <h1>Criar {type === "group" ? "Grupo" : "Usuário"}</h1>
        <form>
          <div className="type">
            <label htmlFor="type">Tipo de entidade: </label>
            <select
              name="type"
              id="type"
              onChange={(e) => handleEntityTypeChange(e)}
            >
              <option value="user">Usuário</option>
              <option value="group">Grupo</option>
            </select>
          </div>
          <input
            type="text"
            placeholder={`Nome ${type === "group" ? "do grupo" : "do usuário"}`}
            id="name"
            value={name}
            required
            maxLength={10}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="ID do usuário"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </form>
        <h1 id="group-section-title">Selecione um grupo*</h1>
        <section className="group-section">
          <div className="wrapper">
            {groups.length >= 1 ? (
              <>
                {groups.map((group) => (
                  <div
                    className="group-card"
                    key={group.id}
                    id={`card-${group.id}`}
                    onClick={() => setGroupActive(group.id)}
                  >
                    <i className="material-icons">group</i>
                    <span>{group.name}</span>
                  </div>
                ))}
              </>
            ) : (
              <h1 style={{ padding: "1rem 0" }}>
                Ainda não há grupos cadastrados.
              </h1>
            )}
          </div>
        </section>
        <p className="error-msg">{createErrorMsg}</p>
        <button type="submit" className="create-button" onClick={handleSubmit}>
          <i className="material-icons">add</i>
          Criar
        </button>
      </CreateEntityContainer>
    </Modal>
  );
}
