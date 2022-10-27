import React from 'react';
import { Form, Button, Modal, Col, Row } from 'react-bootstrap';
import { BsJournalPlus } from 'react-icons/bs';

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
          <div className="text-body fs-4 fw-bold"><BsJournalPlus />&nbsp;&nbsp;&nbsp;{props.name}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='mx-4'>
        <Row>
          <Col>
            <div>
              <div className="text-body fw-bold mb-2">Value</div>
              <div class="input-group mb-3">
                <span class="input-group-text">$</span>
                <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" />
              </div>
            </div>

          </Col>
          <Col>
            <div className="text-body fw-bold mb-2">Category</div>
            <select className="form-select" id="exampleSelect1">
              <option>None</option>
              {props.options}
            </select>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="d-flex align-items-center me-5 mb-2">
              <Form>
                <div className="text-body fw-bold mb-2">Type</div>
                <div key={`reverse-radio`} className="mb-3">
                  <Form.Check
                    label="Income"
                    name="group1"
                    type="radio"
                    id={`reverse-radio-1`}
                    defaultChecked={props.type === 'Income'}
                  />
                  <Form.Check
                    label="Expense"
                    name="group1"
                    type="radio"
                    id={`reverse-radio-2`}
                    defaultChecked={props.type === 'Expense'}
                  />
                </div>
              </Form>
            </div>
          </Col>
          <Col>
            <div>
              <div className="text-body fw-bold mb-2">Description</div>
              <textarea className="form-control" id="exampleTextarea" rows="1"></textarea>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={props.onHide}>Save</Button>
        <Button variant='secondary' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function TransactionModal(props) {
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
        name={props.name}
        type={props.type}
      />
    </>
  );
}