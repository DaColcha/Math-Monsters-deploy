import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "../styles/components/Modal.css";
import close from "../assets/close.svg";

interface ModalProps {
  onCloseModal: () => void;
  isOpen: boolean;
}

export const CustomModal = ({ isOpen, onCloseModal }: ModalProps) => {

    const closeIcon = (
          <img src={close} alt="Cerrar" className="close-icon" role="button" />
      );

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onCloseModal}
        center
        closeIcon={closeIcon}
        classNames={{
          modal: "customModal",
        }}
      >
          <div className="info-text">
            <h2 tabIndex={0}>¡Bienvenido a Math Monsters!</h2>
            <p className="paragraph" tabIndex={0}>
              {" "}
              Este es un juego creado para que practiques tus habilidades en
              Matemáticas sobre progresiones aritméticas y geométricas. Da clic
              en el botón Iniciar y diviértete.
            </p>
            <p className="footer" tabIndex={0}  >Creado por: Guns & Coders</p>
          </div>
      </Modal>
    </div>
  );
};
