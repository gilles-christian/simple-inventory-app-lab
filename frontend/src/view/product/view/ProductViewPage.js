import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import ProductView from 'view/product/view/ProductView';
import { i18n } from 'i18n';
import actions from 'modules/product/view/productViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/product/view/productViewSelectors';
import ProductViewToolbar from 'view/product/view/ProductViewToolbar';

class ProductPage extends Component {
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
            [i18n('entities.product.menu'), '/product'],
            [i18n('entities.product.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.product.view.title')}
          </PageTitle>

          <ProductViewToolbar match={this.props.match} />

          <ProductView
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

export default connect(select)(ProductPage);
