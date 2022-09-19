import React, { Component } from 'react';
import { connect } from 'react-redux';
import { i18n } from 'i18n';
import Toolbar from 'view/shared/styles/Toolbar';
import ButtonIcon from 'view/shared/ButtonIcon';
import ReactTooltip from 'react-tooltip';
import ConfirmModal from 'view/shared/modals/ConfirmModal';

export default (
  selectors,
  actions,
  fields,
  templateHelp,
) => {
  class ImporterToolbar extends Component {
    state = {
      resetConfirmVisible: false,
      discardConfirmVisible: false,
    };

    doOpenResetConfirmModal = () => {
      this.setState({
        resetConfirmVisible: true,
      });
    };

    doCloseResetConfirmModal = () => {
      this.setState({ resetConfirmVisible: false });
    };

    doOpenDiscardConfirmModal = () => {
      this.setState({
        discardConfirmVisible: true,
      });
    };

    doCloseDiscardConfirmModal = () => {
      this.setState({ discardConfirmVisible: false });
    };

    doReset = () => {
      this.doCloseDiscardConfirmModal();
      this.doCloseResetConfirmModal();
      const { dispatch } = this.props;
      dispatch(actions.doReset());
    };

    doPause = () => {
      const { dispatch } = this.props;
      dispatch(actions.doPause());
    };

    doImport = () => {
      const { dispatch } = this.props;
      dispatch(actions.doImport());
    };

    doDownloadTemplate = () => {
      const { dispatch } = this.props;
      dispatch(actions.doDownloadTemplate());
    };

    render() {
      const { hasRows, importing, completed } = this.props;

      const showDownloadTemplate = !hasRows;
      const showImport =
        hasRows && !importing && !completed;
      const showDiscard =
        hasRows && !importing && !completed;
      const showNew = !!completed;
      const showPause = hasRows && importing;

      return (
        <Toolbar>
          {showDownloadTemplate && (
            <React.Fragment>
              <button
                className="btn btn-light"
                type="button"
                onClick={this.doDownloadTemplate}
              >
                <ButtonIcon iconClass="far fa-file-excel" />{' '}
                {i18n('importer.form.downloadTemplate')}
              </button>

              {templateHelp && (
                <span
                  data-tip={templateHelp}
                  data-for="importer-toolbar-help-tooltip"
                  data-html={true}
                >
                  <i
                    style={{ fontSize: '18px' }}
                    className="fas fa-info-circle"
                  />
                  <ReactTooltip id="importer-toolbar-help-tooltip" />
                </span>
              )}
            </React.Fragment>
          )}

          {showImport && (
            <button
              onClick={this.doImport}
              className="btn btn-primary"
              type="button"
            >
              <ButtonIcon iconClass="far fa-save" />{' '}
              {i18n('common.import')}
            </button>
          )}

          {showPause && (
            <button
              className="btn btn-light"
              type="button"
              onClick={this.doPause}
            >
              <ButtonIcon classIcon="fas fa-pause" />{' '}
              {i18n('common.pause')}
            </button>
          )}

          {showNew && (
            <button
              className="btn btn-light"
              type="button"
              onClick={this.doOpenResetConfirmModal}
            >
              <ButtonIcon iconClass="far fa-file" />{' '}
              {i18n('common.new')}
            </button>
          )}

          {showDiscard && (
            <button
              type="button"
              className="btn btn-light"
              onClick={this.doOpenDiscardConfirmModal}
            >
              <ButtonIcon iconClass="far fa-trash-alt" />{' '}
              {i18n('common.discard')}
            </button>
          )}

          {this.state.discardConfirmVisible && (
            <ConfirmModal
              title={i18n('importer.list.discardConfirm')}
              onConfirm={() => this.doReset()}
              onClose={() =>
                this.doCloseDiscardConfirmModal()
              }
              okText={i18n('common.yes')}
              cancelText={i18n('common.no')}
            />
          )}

          {this.state.resetConfirmVisible && (
            <ConfirmModal
              title={i18n('common.areYouSure')}
              onConfirm={() => this.doReset()}
              onClose={() =>
                this.doCloseResetConfirmModal()
              }
              okText={i18n('common.yes')}
              cancelText={i18n('common.no')}
            />
          )}
        </Toolbar>
      );
    }
  }

  function select(state) {
    return {
      hasRows: selectors.selectHasRows(state),
      importing: selectors.selectImporting(state),
      completed: selectors.selectCompleted(state),
    };
  }

  return connect(select)(ImporterToolbar);
};
