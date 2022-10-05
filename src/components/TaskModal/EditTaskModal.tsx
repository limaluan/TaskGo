import Modal from "react-modal";
import { ITask } from "../../services/mirage";

interface ICreateTaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  task: ITask;
}

export function EditTaskModal({
  isOpen,
  onRequestClose,
  task,
}: ICreateTaskModalProps) {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      
    </Modal>
  );
}
