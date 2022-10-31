import React from 'react';
import { Button, Modal, Row } from 'react-bootstrap';
import { BsGear } from 'react-icons/bs';
import TransactionService from '../../api/TransactionService';

const transactionService = new TransactionService();

function VerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="text-body fs-4 fw-bold"><BsGear />&nbsp;&nbsp;&nbsp;Settings</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='mx-4'>
        <Row>
          <Button variant="secondary w-100 mb-2" onClick={() => {
            transactionService.generateMockData();
            document.location.reload();
          }}>Generate mock data</Button>
          <Button variant="danger w-100" onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}>Clear local data</Button>
        </Row>
        <div className="text-body mb-2">

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function SettingsModal(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button onClick={() => setModalShow(true)}>
        {props.buttonContent}
      </Button>

      <VerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}