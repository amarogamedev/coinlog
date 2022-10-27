import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="text-body fs-4 fw-bold"><BsTrash />&nbsp;&nbsp;&nbsp;Delete transaction</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='mx-4'>
        <div className="text-body mb-2">Are you sure you want to delete this transaction? This action can't be undone</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={props.onHide}>Delete</Button>
        <Button variant='secondary' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function DeleteModal(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant={props.buttonVariant} onClick={() => setModalShow(true)}>
        {props.buttonContent}
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        options={props.options}
      />
    </>
  );
}