import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'i18n';
import Toolbar from 'view/shared/styles/Toolbar';
import actions from 'modules/iam/view/iamViewActions';
import { connect } from 'react-redux';
import iamSelectors from 'modules/iam/iamSelectors';
import selectors from 'modules/iam/view/iamViewSelectors';
import auditLogSelectors from 'modules/auditLog/auditLogSelectors';
import ButtonIcon from 'view/shared/ButtonIcon';
import ConfirmModal from 'view/shared/modals/ConfirmModal';

class IamViewToolbar extends Component {
  state = {
    toggleStatusConfirmVisible: false,
  };

  doOpenToggleStatusConfirmModal = () => {
    this.setState({
      toggleStatusConfirmVisible: true,
    });
  };

  doCloseToggleStatusConfirmModal = () => {
    this.setState({ toggleStatusConfirmVisible: false });
  };

  doToggleStatus = () => {
    this.doCloseToggleStatusConfirmModal();
    const { dispatch } = this.props;
    dispatch(actions.doToggleStatus());
  };

  render() {
    const {
      match,
      user,
      hasPermissionToEdit,
      hasPermissionToAuditLogs,
      loading,
    } = this.props;

    const id = match.params.id;

    return (
      <Toolbar>
        {hasPermissionToEdit && (
          <Link to={`/iam/${id}/edit`}>
            <button
              className="btn btn-primary"
              type="button"
            >
              <ButtonIcon iconClass="fas fa-edit" />{' '}
              {i18n('common.edit')}
            </button>
          </Link>
        )}

        {user && hasPermissionToEdit && (
          <button
            className="btn btn-primary"
            type="button"
            disabled={loading}
            onClick={this.doOpenToggleStatusConfirmModal}
          >
            <ButtonIcon
              iconClass={
                user.disabled
                  ? 'fas fa-check'
                  : 'fas fa-ban'
              }
            />{' '}
            {user.disabled
              ? i18n('iam.enable')
              : i18n('iam.disable')}
          </button>
        )}

        {hasPermissionToAuditLogs && (
          <Link
            to={`/audit-logs?entityId=${encodeURIComponent(
              id,
            )}`}
          >
            <button className="btn btn-light" type="button">
              <ButtonIcon iconClass="fas fa-history" />{' '}
              {i18n('auditLog.menu')}
            </button>
          </Link>
        )}

        {user && user.email && hasPermissionToAuditLogs && (
          <Link
            to={`/audit-logs?createdByEmail=${encodeURIComponent(
              user.email,
            )}`}
          >
            <button className="btn btn-light" type="button">
              <ButtonIcon iconClass="far fa-eye" />{' '}
              {i18n('iam.view.activity')}
            </button>
          </Link>
        )}

        {this.state.toggleStatusConfirmVisible && (
          <ConfirmModal
            title={i18n('common.areYouSure')}
            onConfirm={() => this.doToggleStatus()}
            onClose={() =>
              this.doCloseToggleStatusConfirmModal()
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
    loading: selectors.selectLoading(state),
    user: selectors.selectUser(state),
    hasPermissionToAuditLogs: auditLogSelectors.selectPermissionToRead(
      state,
    ),
    hasPermissionToEdit: iamSelectors.selectPermissionToEdit(
      state,
    ),
  };
}

export default connect(select)(IamViewToolbar);
