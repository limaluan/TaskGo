import { useRouter } from "next/router";
import { FormEvent, useContext, useState } from "react";
import Modal from "react-modal";
import { UserContext } from "../../../contexts/UserContext";
import { ModalContainer } from "../TaskModal/styles";

interface ICreateEntityModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  redirectsTarget: string;
}

export function UserAuthenticateModal({
  isOpen,
  onRequestClose,
  redirectsTarget,
}: ICreateEntityModalProps) {
  const [errorMsg, setErrorMsg] = useState("");
  const [userId, setUserId] = useState("");
  const { signIn } = useContext(UserContext);

  const { push: redirectsTo } = useRouter();

  const handleAuthUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signIn(userId);
    } catch (e: any) {
      return setErrorMsg("ID Inválido");
    }

    redirectsTo(`/${redirectsTarget}`);
    setErrorMsg("");
    setUserId("");
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
        <h1>Confirme seu ID</h1>
        <form onSubmit={(e) => handleAuthUser(e)}>
          <input
            type="number"
            placeholder="ID do Usuário"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <p className="error-msg">{errorMsg}</p>
        </form>
      </ModalContainer>
    </Modal>
  );
}
