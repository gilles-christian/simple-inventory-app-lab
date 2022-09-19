import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import CustomerView from 'view/customer/view/CustomerView';
import { i18n } from 'i18n';
import actions from 'modules/customer/view/customerViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/customer/view/customerViewSelectors';
import CustomerViewToolbar from 'view/customer/view/CustomerViewToolbar';

class CustomerPage extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id));
  }

  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.customer.menu'), '/customer'],
            [i18n('entities.customer.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.customer.view.title')}
          </PageTitle>

          <CustomerViewToolbar match={this.props.match} />

          <CustomerView
            loading={this.props.loading}
            record={this.props.record}
          />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    record: selectors.selectRecord(state),
  };
}

export default connect(select)(CustomerPage);
