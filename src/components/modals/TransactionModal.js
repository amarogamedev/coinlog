import React from 'react';
import { Button, Modal, Col, Row } from 'react-bootstrap';
import { BsJournalPlus } from 'react-icons/bs';
import TransactionService from '../../api/TransactionService';

let type;
let category = React.createRef();
let value = React.createRef();
let description = React.createRef();

const transactionService = new TransactionService();

function insertTransaction(transaction, index, dashboard, onHide) {
  console.log(dashboard);
  index === null ? transactionService.insertTransaction(transaction) : transactionService.insertTransactionOnIndex(transaction, index);
  dashboard.updateData();
  onHide();
}

function generateTransaction() {
  const today = new Date();
  return (
    {
      "type": type,
      "category": category.current.value,
      "value": +value.current.value,
      "year": today.getFullYear(),
      "month": today.getMonth() + 1,
      "day": today.getDate(),
      "description": description.current.value
    }
  )
}

function fillCategory (transaction) {
  if(transaction !== undefined && transaction !== null) {
    return transaction.category;
  }
  else {
    return null;
  }
}

function fillValue (transaction) {
  if(transaction !== undefined && transaction !== null) {
    return transaction.value;
  }
  else {
    return null;
  }
}

function fillDescription (transaction) {
  if(transaction !== undefined && transaction !== null) {
    return transaction.description;
  }
  else {
    return null;
  }
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
          <div className="text-body fs-4 fw-bold"><BsJournalPlus />&nbsp;&nbsp;&nbsp;{props.name}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='mx-4'>
        <Row>
          <Col>
            <div>
              <div className="text-body fw-bold mb-2">Value</div>
              <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input type="number" className="form-control" defaultValue={fillValue(props.transaction)} ref={value} aria-label="Amount (to the nearest dollar)" />
              </div>
            </div>
          </Col>
          <Col>
            <div className="text-body fw-bold mb-2">Category</div>
            <select className="form-select" defaultValue={fillCategory(props.transaction)} ref={category} id="exampleSelect1">
              {props.options}
            </select>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <div className="text-body fw-bold mb-2">Description</div>
              <textarea className="form-control" defaultValue={fillDescription(props.transaction)} ref={description} id="exampleTextarea" rows="2"></textarea>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={() => insertTransaction(generateTransaction(), props.index, props.dashboard, props.onHide)}>Save</Button>
        <Button variant='secondary' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function TransactionModal(props) {
  const [modalShow, setModalShow] = React.useState(false);
  type = props.type;
  return (
    <>
      <Button variant={props.buttonVariant} onClick={() => setModalShow(true)}>
        {props.buttonContent}
      </Button>

      <VerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        options={props.options}
        name={props.name}
        type={props.type}
        transaction={props.transaction}
        index={props.index}
        dashboard={props.dashboard}
      />
    </>
  );
}