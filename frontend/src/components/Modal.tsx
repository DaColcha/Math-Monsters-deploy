import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "../styles/components/Modal.css";
import close from "../assets/close.svg";
import { useRef, useEffect } from "react";

interface ModalProps {
  onCloseModal: () => void;
  isOpen: boolean;
}

export const CustomModal = ({ isOpen, onCloseModal }: ModalProps) => {
  const modalTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isOpen && modalTitleRef.current) {
      modalTitleRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onCloseModal}
        center
        closeIcon={
          <img src={close} alt="Cerrar" className="close-icon" role="button" />
        }
        classNames={{
          modal: "customModal",
        }}
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
        aria-modal="true"
      >
        <div className="info-text" tabIndex={0}>
          <h2 id="modalTitle">
            ¡Bienvenido a Math Monsters!
          </h2>
          <p className="paragraph" id="modalDescription" >
            Este es un juego creado para que practiques tus habilidades en
            Matemáticas sobre progresiones aritméticas y geométricas. Da clic
            en el botón Iniciar y diviértete.
          </p>
          <p className="footer" tabIndex={0}>Creado por: Guns & Coders</p>
        </div>
      </Modal>
    </div>
  );
};

