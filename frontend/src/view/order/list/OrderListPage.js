import React, { Component } from 'react';
import OrderListFilter from 'view/order/list/OrderListFilter';
import OrderListTable from 'view/order/list/OrderListTable';
import OrderListToolbar from 'view/order/list/OrderListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class OrderListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.order.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.order.list.title')}
          </PageTitle>

          <OrderListToolbar />
          <OrderListFilter />
          <OrderListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default OrderListPage;
