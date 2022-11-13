import Modal from "react-modal";
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

  const handleDeleteEntity = async () => {
    await fetch(`http://localhost:3000/api/entity`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entity)
    }).then(response => response.json())

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
        {entity.type === "group" && <h2 className="error-msg">Remover este grupo, removerá também todos usuários que fazem parte dele.</h2> }
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
