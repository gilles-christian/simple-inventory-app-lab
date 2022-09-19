import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/product/importer/productImporterSelectors';
import ProductService from 'modules/product/productService';
import fields from 'modules/product/importer/productImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'PRODUCT_IMPORTER',
  selectors,
  ProductService.import,
  fields,
  i18n('entities.product.importer.fileName'),
);
