import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/order/importer/orderImporterSelectors';
import OrderService from 'modules/order/orderService';
import fields from 'modules/order/importer/orderImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'ORDER_IMPORTER',
  selectors,
  OrderService.import,
  fields,
  i18n('entities.order.importer.fileName'),
);
