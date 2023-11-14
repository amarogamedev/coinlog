import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { BsMenuButtonWideFill } from 'react-icons/bs';

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
          <div className="text-body fs-4 fw-bold"><BsMenuButtonWideFill />&nbsp;&nbsp;&nbsp;About this project</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='mx-4'>
        <div className="text-body mb-2">
          CoinLog was developed using React and Bootstrap. It is a static website and uses your browser's local storage to save data in a JSON file.<br />
          It is hosted on GitHub pages and you can see the source code by clicking the button on the bottom of this window.<br />
          <br />
          <div className="card">
            <div className="card-body">
              <div className="text-body fs-5 fw-bold">Luis Fellipe Amaro</div>
              I'm a 19 year old developer and I have been programming since 2019. I started studying web development in 2022 and this is a project I've made
              to gain experience with JavaScript, HTML and CSS<br /><br />
              <a href="https://github.com/amarogamedev" className="card-link">Github</a>
              <a href="https://www.linkedin.com/in/luisfellipeamaro/" className="card-link">LinkedIn</a>
              <a href="https://discordapp.com/users/553007786766761996" className="card-link">Discord</a>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' href='https://github.com/amarogamedev/coinlog' target="_blank">View source code</Button>
        <Button variant='secondary' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function AboutModal(props) {
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