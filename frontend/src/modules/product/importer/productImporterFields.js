import model from 'modules/product/productModel';

const { fields } = model;

export default [
  fields.name,
  fields.description,
  fields.unitPrice,
  fields.photos,
];
