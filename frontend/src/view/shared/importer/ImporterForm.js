import {
  EXCEL_EXTENSION,
  EXCEL_TYPE,
} from 'modules/shared/excel/excel';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { i18n } from 'i18n';
import FormWrapper from 'view/shared/styles/FormWrapper';

export default (selectors, actions) => {
  class ImporterForm extends Component {
    constructor(props) {
      super(props);
      this.input = React.createRef();
    }

    handleChange = (event) => {
      const files = event.target.files;

      if (!files || !files.length) {
        return;
      }

      let file = files[0];

      const { dispatch } = this.props;
      dispatch(actions.doReadFile(file));
    };

    render() {
      return (
        <FormWrapper style={{ paddingLeft: 0 }}>
          <label
            className="btn btn-primary px-4 mb-2"
            style={{ cursor: 'pointer' }}
          >
            <i className="fas fa-plus" />{' '}
            {i18n('fileUploader.upload')}
            <input
              style={{ display: 'none' }}
              accept={`${EXCEL_TYPE}, ${EXCEL_EXTENSION}`}
              type="file"
              onChange={this.handleChange}
              ref={this.input}
            />
          </label>
          <div className="invalid-feedback">
            {this.props.errorMessage}
          </div>
        </FormWrapper>
      );
    }
  }

  function select(state) {
    return {
      errorMessage: selectors.selectErrorMessage(state),
    };
  }

  return connect(select)(ImporterForm);
};
