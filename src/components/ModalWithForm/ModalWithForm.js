import React from "react";
import { Modal, Alert } from "react-bootstrap";

const ModalWithForm = ({
  title,
  onSubmit,
  onClose,
  errors,
  children,
  showCloseButton = true,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Modal show={true} onHide={showCloseButton ? onClose : null}>
      <Modal.Header closeButton={showCloseButton}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-3">
        <form onSubmit={handleSubmit} className="modal-form">
          {errors && (
            <Alert variant="danger">
              <div className="alert-body">
                <span>{`Error: ${errors}`}</span>
              </div>
            </Alert>
          )}
          {children}
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalWithForm;
