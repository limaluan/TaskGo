import Modal from "react-modal";
import { api } from "../../services/api";
import { IEntity } from "../../services/mirage";
import { CreateEntityContainer } from "./styles";

interface ICreateEntityModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  entity: IEntity;
}

export function ConfirmationModal({
  isOpen,
  onRequestClose,
  entity,
}: ICreateEntityModalProps) {
  const handleDeleteEntity = () => {
    try {
      api.delete(`/entities/${entity.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <CreateEntityContainer>
        <h1>Deseja remover {entity.name}?</h1>
        <button
          onClick={handleDeleteEntity}
          style={{ padding: "1rem", backgroundColor: "red", color: "#ffffff" }}
        >
          Remover
        </button>
        <button onClick={onRequestClose} style={{ padding: "1rem" }}>
          Cancelar
        </button>
      </CreateEntityContainer>
    </Modal>
  );
}
