import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {usePrevious} from '@helpers/helpers';
import './modal.scss';

// simplified modal for use inside of content
const Modal = props => {
  // internal values
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const animateModalClose = () => {
    setIsClosing(true);
    setIsOpen(false);

    window.setTimeout(function() {
      setIsClosing(false);
    }.bind(this), 350);
  }

  // props
  const prevModalState = usePrevious({open: props.open});

  // toggleModal
  useEffect(() => {
    if (prevModalState === undefined) {
      return;
    }

    if (props.open) {
      setIsOpen(true);
    } else {
      animateModalClose()
    }
  }, [props.open]);

  const modalClassNames = classnames({
    "modal": true,
    "modal--open": isOpen,
    "modal--closing": isClosing
  });

  return (
    <>
      {(isOpen || isClosing) &&
        <div className={modalClassNames}>
          <div className="modal__body">
            {props.children}
          </div>
          <div className="modal__overlay" onClick={props.onRequestClose}/>
        </div>
      }
    </>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default Modal;
