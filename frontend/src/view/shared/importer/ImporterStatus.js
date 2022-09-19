import React, { Component } from 'react';
import { connect } from 'react-redux';
import { i18n } from 'i18n';
import ImporterStatusWrapper from 'view/shared/importer/styles/ImporterStatusWrapper';

export default (selectors) => {
  class ImporterStatus extends Component {
    renderCompleted() {
      return (
        <div className="alert alert-success">
          {i18n('importer.completed.success')}
        </div>
      );
    }

    renderCompletedSomeErrors() {
      return (
        <div className="alert alert-warning">
          {i18n('importer.completed.someErrors')}
        </div>
      );
    }

    renderCompletedAllErrors() {
      return (
        <div className="alert alert-danger">
          {i18n('importer.completed.allErrors')}
        </div>
      );
    }

    renderProcessing() {
      return (
        <React.Fragment>
          <div className="progress">
            <div
              className="progress-bar"
              style={{ width: `${this.props.percent}%` }}
            ></div>
          </div>
          <p>
            {i18n(
              'importer.importedMessage',
              this.props.nonPendingRowsCount,
              this.props.rowsCount,
            )}{' '}
            {i18n('importer.noNavigateAwayMessage')}
          </p>
        </React.Fragment>
      );
    }

    renderBody() {
      const {
        completed,
        errorRowsCount,
        rowsCount,
      } = this.props;

      const isAllErrors = errorRowsCount === rowsCount;

      if (completed && isAllErrors) {
        return this.renderCompletedAllErrors();
      }

      const isSomeErrors = !!errorRowsCount;

      if (completed && isSomeErrors) {
        return this.renderCompletedSomeErrors();
      }

      const allSuccess = !errorRowsCount;

      if (completed && allSuccess) {
        return this.renderCompleted();
      }

      return this.renderProcessing();
    }

    render() {
      const { importing, completed } = this.props;

      if (!importing && !completed) {
        return null;
      }

      return (
        <ImporterStatusWrapper>
          {this.renderBody()}
        </ImporterStatusWrapper>
      );
    }
  }

  function select(state) {
    return {
      completed: selectors.selectCompleted(state),
      importing: selectors.selectImporting(state),
      nonPendingRowsCount: selectors.selectNonPendingRowsCount(
        state,
      ),
      rowsCount: selectors.selectRowsCount(state),
      percent: selectors.selectPercent(state),
      errorRowsCount: selectors.selectErrorRowsCount(state),
    };
  }

  return connect(select)(ImporterStatus);
};
