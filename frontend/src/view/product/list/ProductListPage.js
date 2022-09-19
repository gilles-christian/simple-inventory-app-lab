import React, { Component } from 'react';
import ProductListFilter from 'view/product/list/ProductListFilter';
import ProductListTable from 'view/product/list/ProductListTable';
import ProductListToolbar from 'view/product/list/ProductListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class ProductListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.product.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.product.list.title')}
          </PageTitle>

          <ProductListToolbar />
          <ProductListFilter />
          <ProductListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default ProductListPage;
