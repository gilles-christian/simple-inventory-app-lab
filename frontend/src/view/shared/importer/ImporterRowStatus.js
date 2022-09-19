import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { i18n } from 'i18n';
import statuses from 'modules/shared/importer/importerStatuses';
import ImporterErrorStatusMessage from 'view/shared/importer/styles/ImporterErrorStatusMessage';

class ImporterRowStatus extends Component {
  render() {
    const { value, errorMessage } = this.props;

    if (value === statuses.PENDING) {
      return (
        <span className="badge badge-secondary">
          {i18n('importer.pending')}
        </span>
      );
    }

    if (value === statuses.IMPORTED) {
      return (
        <span className="badge badge-success">
          {i18n('importer.imported')}
        </span>
      );
    }

    if (value === statuses.ERROR) {
      return (
        <React.Fragment>
          <span className="badge badge-danger">
            {i18n('importer.error')}
          </span>{' '}
          <ImporterErrorStatusMessage>
            {errorMessage}
          </ImporterErrorStatusMessage>
        </React.Fragment>
      );
    }
  }
}

ImporterRowStatus.propTypes = {
  value: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};

export default ImporterRowStatus;
