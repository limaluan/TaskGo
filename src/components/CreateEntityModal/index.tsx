import { ChangeEvent, useEffect, useState } from "react";
import Modal from "react-modal";
import { IEntity, getGroups } from "../../services/hooks/useEntities";
import { CreateEntityContainer } from "./styles";

interface ICreateEntityModalProps {
  isOpen: boolean;
  onRequestClose?: () => void;
}

export function CreateEntityModal({
  isOpen,
  onRequestClose,
}: ICreateEntityModalProps) {
  let [groups, setGroups] = useState<IEntity[]>([]);

  useEffect(() => {
    getGroups().then((groupsData) => setGroups(groupsData));
  }, []);

  const handleEntityTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
    document.querySelector(".group-section")?.classList.toggle("off");
    document.querySelector("#group-section-title")?.classList.toggle("off");
    document.querySelector("#id")?.classList.toggle("off");
  };

  const setGroupActive = (groupId: string) => {
    document.querySelectorAll(".group-card").forEach((card) => {
      card.classList.remove("selected");
    });

    document.querySelector(`#card-${groupId}`)?.classList.add("selected");
  };

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [id, setId] = useState("");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
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
            placeholder="Nome"
            id="name"
            value={name}
            required
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
        <div className="group-section">
          <div className="wrapper">
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
          </div>
        </div>
        <button type="submit" className="create-button">
          <i className="material-icons">add</i>
          Criar
        </button>
      </CreateEntityContainer>
    </Modal>
  );
}
