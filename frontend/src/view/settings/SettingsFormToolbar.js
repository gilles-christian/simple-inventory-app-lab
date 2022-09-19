import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'i18n';
import Toolbar from 'view/shared/styles/Toolbar';
import auditLogSelectors from 'modules/auditLog/auditLogSelectors';
import { connect } from 'react-redux';
import ButtonIcon from 'view/shared/ButtonIcon';

class SettingsFormToolbar extends Component {
  render() {
    return (
      <Toolbar style={{ marginBottom: '16px' }}>
        {this.props.hasPermissionToAuditLogs && (
          <Link to={`/audit-logs?entityNames=settings`}>
            <button className="btn btn-light" type="button">
              <ButtonIcon iconClass="fas fa-history" />{' '}
              {i18n('auditLog.menu')}
            </button>
          </Link>
        )}
      </Toolbar>
    );
  }
}

function select(state) {
  return {
    hasPermissionToAuditLogs: auditLogSelectors.selectPermissionToRead(
      state,
    ),
  };
}

export default connect(select)(SettingsFormToolbar);
