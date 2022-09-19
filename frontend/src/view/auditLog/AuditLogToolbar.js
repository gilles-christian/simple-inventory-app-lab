import React, { Component } from 'react';
import Toolbar from 'view/shared/styles/Toolbar';
import { connect } from 'react-redux';
import selectors from 'modules/auditLog/auditLogSelectors';
import actions from 'modules/auditLog/auditLogActions';
import { i18n } from 'i18n';
import ButtonIcon from 'view/shared/ButtonIcon';
import ReactTooltip from 'react-tooltip';

class AuditLogToolbar extends Component {
  doExport = () => {
    const { dispatch } = this.props;
    dispatch(actions.doExport());
  };

  renderExportButton() {
    const { hasRows, loading, exportLoading } = this.props;

    const disabled = !hasRows || loading;

    return (
      <React.Fragment>
        <span
          data-tip={i18n('common.noDataToExport')}
          data-tip-disable={!disabled}
          data-for="audit-log-toolbar-export-tooltip"
        >
          <button
            className="btn btn-light"
            type="button"
            disabled={disabled}
            onClick={this.doExport}
          >
            <ButtonIcon
              loading={exportLoading}
              iconClass="far fa-file-excel"
            />{' '}
            {i18n('common.export')}
          </button>
        </span>
        <ReactTooltip id="audit-log-toolbar-export-tooltip" />
      </React.Fragment>
    );
  }

  render() {
    return <Toolbar>{this.renderExportButton()}</Toolbar>;
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    exportLoading: selectors.selectExportLoading(state),
    hasRows: selectors.selectHasRows(state),
  };
}

export default connect(select)(AuditLogToolbar);
