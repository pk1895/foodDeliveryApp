import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
import React from 'react';

const Backdrop = (props) => {
    return (
        <div className={classes.backdrop} onClick={props.onCancel}></div>
    );
};

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const Modal = (props) => {
    const modalId = document.getElementById('modal')
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onCancel={props.onCancel}/>, modalId)};
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, modalId)};
        </React.Fragment>
    );
};

export default Modal;