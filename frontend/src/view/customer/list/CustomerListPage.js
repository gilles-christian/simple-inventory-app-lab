import React, { Component } from 'react';
import CustomerListFilter from 'view/customer/list/CustomerListFilter';
import CustomerListTable from 'view/customer/list/CustomerListTable';
import CustomerListToolbar from 'view/customer/list/CustomerListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class CustomerListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.customer.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.customer.list.title')}
          </PageTitle>

          <CustomerListToolbar />
          <CustomerListFilter />
          <CustomerListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default CustomerListPage;
