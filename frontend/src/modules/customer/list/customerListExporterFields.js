import model from 'modules/customer/customerModel';

const { fields } = model;

export default [
  fields.id,
  fields.name,
  fields.birthdate,
  fields.gender,
  fields.createdAt,
  fields.updatedAt
];
