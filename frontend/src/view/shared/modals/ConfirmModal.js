import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ConfirmModal extends Component {
  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
  }

  onConfirm = () => {
    window.$(this.modalRef.current).modal('hide');
    return this.props.onConfirm();
  };

  componentDidMount() {
    window.$(this.modalRef.current).modal('show');
    window
      .$(this.modalRef.current)
      .on('hidden.bs.modal', this.props.onClose);
  }

  render() {
    return ReactDOM.createPortal(
      <div
        ref={this.modalRef}
        className="modal"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {this.props.title}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-dismiss="modal"
              >
                {this.props.cancelText}
              </button>
              <button
                type="button"
                onClick={this.onConfirm}
                className="btn btn-primary"
              >
                {this.props.okText}
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.getElementById('modal-root'),
    );
  }
}

export default ConfirmModal;
