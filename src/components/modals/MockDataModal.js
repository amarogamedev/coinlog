import React from 'react';
import { Button, Modal, Col, Row } from 'react-bootstrap';
import { BsPencil } from 'react-icons/bs';
import TransactionService from '../../api/TransactionService';

const transactionService = new TransactionService();

function addData(dashboard, onHide) {
  localStorage.setItem("data", "1");
  transactionService.generateMockData();
  dashboard.updateData();
  onHide();
}

function ignore(dashboard, onHide) {
  localStorage.setItem("data", "1");
  dashboard.updateData();
  onHide();
}

function VerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="text-body fs-4 fw-bold"><BsPencil />&nbsp;&nbsp;&nbsp;Mock data</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='mx-4'>
        <Row>
          <Col>
            <div className="container">
              Welcome to CoinLog! Since this is your first time around here, would you like to generate random transactions to better visualize the system's functionality?
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={() => addData(props.dashboard, props.onHide)}>Create data</Button>
        <Button variant='secondary' onClick={() => ignore(props.dashboard, props.onHide)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function MockDataModal(props) {
  const [modalShow, setModalShow] = React.useState(false);

  if (localStorage.getItem("data") === null) {
    localStorage.setItem("data", "1");
    setModalShow(true);
  }

  return (
    <>
      <VerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        dashboard={props.dashboard}
      />
    </>
  );
}