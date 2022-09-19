import model from 'modules/order/orderModel';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import ViewWrapper from 'view/shared/styles/ViewWrapper';
import TextViewItem from 'view/shared/view/TextViewItem';
import UserViewItem from 'view/iam/view/UserViewItem';
import FilesViewItem from 'view/shared/view/FilesViewItem';
import CustomerViewItem from 'view/customer/view/CustomerViewItem';
import ProductViewItem from 'view/product/view/ProductViewItem';

const { fields } = model;

class OrderView extends Component {
  renderView() {
    const { record } = this.props;

    return (
      <ViewWrapper>
        <TextViewItem
          label={fields.id.label}
          value={fields.id.forView(record.id)}
        />

        <CustomerViewItem
          label={fields.customer.label}
          value={fields.customer.forView(record.customer)}
        />

        <ProductViewItem
          label={fields.products.label}
          value={fields.products.forView(record.products)}
        />

        <UserViewItem
          label={fields.employee.label}
          value={fields.employee.forView(record.employee)}
        />

        <TextViewItem
          label={fields.delivered.label}
          value={fields.delivered.forView(record.delivered)}
        />

        <FilesViewItem
          label={fields.attachments.label}
          value={fields.attachments.forView(record.attachments)}
        />

        <TextViewItem
          label={fields.createdAt.label}
          value={fields.createdAt.forView(record.createdAt)}
        />

        <TextViewItem
          label={fields.updatedAt.label}
          value={fields.updatedAt.forView(record.updatedAt)}
        />
      </ViewWrapper>
    );
  }

  render() {
    const { record, loading } = this.props;

    if (loading || !record) {
      return <Spinner />;
    }

    return this.renderView();
  }
}

export default OrderView;
