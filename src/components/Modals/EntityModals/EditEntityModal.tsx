import { useState, useEffect } from "react";
import Modal from "react-modal";
import { api } from "../../../services/api";
import { getGroups, useEntities } from "../../../services/hooks/useEntities";
import { IEntity } from "../../../services/mirage";
import { ModalContainer } from "./styles";

interface ICreateEntityModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  entity: IEntity;
}

export function EditEntityModal({
  isOpen,
  onRequestClose,
  entity,
}: ICreateEntityModalProps) {
  const { data ,refetch } = useEntities();
  
  let [groups, setGroups] = useState<IEntity[]>([]);

  useEffect(() => {
    getGroups().then((groupsData) => setGroups(groupsData));
  }, [data]);

  const [newGroupId, setNewGroupId] = useState("");
  const [editErrorMsg, setEditErrorMsg] = useState("");

  const setGroupActive = (groupId: string) => {
    document.querySelectorAll(".group-card").forEach((card) => {
      card.classList.remove("selected");
    });

    setNewGroupId(groupId);
    document.querySelector(`#card-${groupId}`)?.classList.add("selected");
  };

  const [newName, setNewName] = useState("");

  const handleSubmit = async () => {
    const newEntity = { ...entity, name: newName, group: newGroupId };

    try {
      await api.put("/entities", newEntity);
    } catch (e: any) {
      return setEditErrorMsg(e.response.data.message + "*");
    }

    setNewName("");
    setNewGroupId("");
    setEditErrorMsg("");
    refetch();
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
        <h1>Editar</h1>
        <input
          type="text"
          placeholder="Novo nome"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        {entity.type === "user" ? (
          <>
            <h1>Selecione um grupo*</h1>
            <section className="select-section">
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
            </section>
          </>
        ) : (
          <></>
        )}
        <p className="error-msg">{editErrorMsg}</p>
        <button type="submit" className="create-button" onClick={handleSubmit}>
          <i className="material-icons">add</i>
          Editar
        </button>
      </ModalContainer>
    </Modal>
  );
}
