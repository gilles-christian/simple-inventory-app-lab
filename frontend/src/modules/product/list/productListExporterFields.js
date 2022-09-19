import model from 'modules/product/productModel';

const { fields } = model;

export default [
  fields.id,
  fields.name,
  fields.description,
  fields.unitPrice,
  fields.photos,
  fields.createdAt,
  fields.updatedAt
];
