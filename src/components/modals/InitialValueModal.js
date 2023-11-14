import React from 'react';
import { Button, Modal, Col, Row } from 'react-bootstrap';
import { BsPencil } from 'react-icons/bs';

let input = React.createRef();

function updateValue(dashboard, onHide) {
  localStorage.setItem('initialValue', input.current.value);
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
          <div className="text-body fs-4 fw-bold"><BsPencil />&nbsp;&nbsp;&nbsp;Add initial value</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='mx-4'>
        <Row>
          <Col>
            <div>
              <div className="text-body fw-bold mb-2">Value</div>
              <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input type="number" ref={input} className="form-control" aria-label="Amount (to the nearest dollar)" />
              </div>
            </div>
          </Col>
          <Col>
            <div className="container">
              The initial value is used to keep track of your balance before you started registering transactions on CoinLog
              Current value: {Intl.NumberFormat('en-US', { style: "currency", currency: "USD", }).format(+localStorage.getItem('initialValue'))}
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={() => updateValue(props.dashboard, props.onHide)}>Save</Button>
        <Button variant='secondary' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function InitialValueModal(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant={props.buttonVariant} onClick={() => setModalShow(true)}>
        {props.buttonContent}
      </Button>

      <VerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        dashboard={props.dashboard}
      />
    </>
  );
}