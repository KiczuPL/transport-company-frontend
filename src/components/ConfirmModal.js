import { Button, Modal } from "react-bootstrap";

export default function ({
  show,
  header,
  body,
  handleClose,
  handleConfirm,
  dangerousAction,
}) {
  return (
    <Modal show={show}>
      <Modal.Header>
        <h2>{header}</h2>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        {}
        {dangerousAction ? (
          <>
            {" "}
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="danger" onClick={handleConfirm}>
              Confirm
            </Button>
          </>
        ) : (
          <>
            {" "}
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="success" onClick={handleConfirm}>
              Confirm
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}
