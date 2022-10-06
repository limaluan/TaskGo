import Modal from "react-modal";
import { api } from "../../../services/api";
import { useEntities } from "../../../services/hooks/useEntities";
import { useTasks } from "../../../services/hooks/useTasks";
import { IEntity } from "../../../services/mirage";
import { ModalContainer } from "./styles";

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
  const { refetch: refetchEntities } = useEntities();
  const { refetch: refetchTasks } = useTasks();

  const handleDeleteEntity = () => {
    try {
      api.delete(`/entities/${entity.id}`);
    } catch (e) {
      console.log(e);
    }

    refetchTasks();
    refetchEntities();
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
        <h1>Deseja remover {entity.name}?</h1>
        <button
          onClick={handleDeleteEntity}
          className="cancel-button"
        >
          Remover
        </button>
        <button onClick={onRequestClose} style={{ padding: "1rem" }}>
          Cancelar
        </button>
      </ModalContainer>
    </Modal>
  );
}
