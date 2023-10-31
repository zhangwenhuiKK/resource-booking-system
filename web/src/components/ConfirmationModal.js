import React from "react";
import ReactModal from "react-modal";
// import {  Modal } from "antd";
import momentTimezone from "moment-timezone";
import Button from "./Button";

const ConfirmationModal = (props) => {
  return (
    <React.Fragment>
      {props.isModalOpen && (
        <ReactModal
          isOpen={true}
          onRequestClose={props.onCloseConfirmation}
          ariaHideApp={true}
          shouldFocusAfterRender={true}
          shouldReturnFocusAfterClose={true}
          contentLabel="Confirmation"
          appElement={document.getElementById("app")}
          closeTimeoutMS={200}
          className="modal"
        >
          <h3 className="modal__title important__title">IMPORTANT!!!</h3>
          <div className="confirmation__content">{props.content}</div>
          <Button onClick={props.onConfirm} text={`Confirm`} />
          <Button
            className="button__close button--alternative"
            onClick={props.onCloseConfirmation}
            text={`Close`}
          />
        </ReactModal>
      )}
    </React.Fragment>
  );
};
export default ConfirmationModal;
