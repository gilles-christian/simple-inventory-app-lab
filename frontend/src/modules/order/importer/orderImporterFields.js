import model from 'modules/order/orderModel';

const { fields } = model;

export default [
  fields.customer,
  fields.products,
  fields.employee,
  fields.delivered,
  fields.attachments,
];
