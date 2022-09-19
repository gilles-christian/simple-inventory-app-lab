import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import OrderView from 'view/order/view/OrderView';
import { i18n } from 'i18n';
import actions from 'modules/order/view/orderViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/order/view/orderViewSelectors';
import OrderViewToolbar from 'view/order/view/OrderViewToolbar';

class OrderPage extends Component {
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
            [i18n('entities.order.menu'), '/order'],
            [i18n('entities.order.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.order.view.title')}
          </PageTitle>

          <OrderViewToolbar match={this.props.match} />

          <OrderView
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

export default connect(select)(OrderPage);
