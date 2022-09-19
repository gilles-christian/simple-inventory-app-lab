import actions from 'modules/auditLog/auditLogActions';
import selectors from 'modules/auditLog/auditLogSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableWrapper from 'view/shared/styles/TableWrapper';
import model from 'modules/auditLog/auditLogModel';
import { i18n } from 'i18n';
import TableColumnHeader from 'view/shared/table/TableColumnHeader';
import Spinner from 'view/shared/Spinner';
import Pagination from 'view/shared/table/Pagination';

const { fields } = model;

class AuditLogTable extends Component {
  doOpenSelectdValues(values) {
    const data = JSON.stringify(values, null, 2);
    const jsonWindow = window.open(
      '',
      '_blank',
      'toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400',
    );
    jsonWindow.document.write(`<pre>${data}</pre>`);
  }

  doChangeSort = (columnKey) => {
    const { dispatch, sorter } = this.props;

    const order =
      sorter.columnKey === columnKey &&
      sorter.order === 'ascend'
        ? 'descend'
        : 'ascend';

    dispatch(
      actions.doChangeSort({
        columnKey,
        order,
      }),
    );
  };

  doChangePagination = (pagination) => {
    const { dispatch } = this.props;
    dispatch(actions.doChangePagination(pagination));
  };

  render() {
    const {
      pagination,
      rows,
      loading,
      hasRows,
      sorter,
    } = this.props;

    return (
      <TableWrapper>
        <div className="table-responsive">
          <table className="table table-bordered mt-4">
            <thead className="thead">
              <tr>
                <TableColumnHeader
                  onSort={this.doChangeSort}
                  hasRows={hasRows}
                  sorter={sorter}
                  name={fields.timestamp.name}
                  label={fields.timestamp.label}
                />
                <TableColumnHeader
                  onSort={this.doChangeSort}
                  hasRows={hasRows}
                  sorter={sorter}
                  name={fields.createdByEmail.name}
                  label={fields.createdByEmail.label}
                />
                <TableColumnHeader
                  onSort={this.doChangeSort}
                  hasRows={hasRows}
                  sorter={sorter}
                  name={fields.entityName.name}
                  label={fields.entityName.label}
                />
                <TableColumnHeader
                  onSort={this.doChangeSort}
                  hasRows={hasRows}
                  sorter={sorter}
                  name={fields.action.name}
                  label={fields.action.label}
                />
                <TableColumnHeader
                  onSort={this.doChangeSort}
                  hasRows={hasRows}
                  sorter={sorter}
                  name={fields.entityId.name}
                  label={fields.entityId.label}
                />
                <TableColumnHeader className="th-actions-sm" />
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={100}>
                    <Spinner />
                  </td>
                </tr>
              )}
              {!loading && !hasRows && (
                <tr>
                  <td colSpan={100}>
                    <div className="d-flex justify-content-center">
                      {i18n('table.noData')}
                    </div>
                  </td>
                </tr>
              )}
              {!loading &&
                rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      {fields.timestamp.forView(
                        row[fields.timestamp.name],
                      )}
                    </td>
                    <td>
                      {fields.createdByEmail.forView(
                        row[fields.createdByEmail.name],
                      )}
                    </td>
                    <td>
                      {fields.entityName.forView(
                        row[fields.entityName.name],
                      )}
                    </td>
                    <td>
                      {fields.action.forView(
                        row[fields.action.name],
                      )}
                    </td>
                    <td>
                      {fields.entityId.forView(
                        row[fields.entityId.name],
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-link"
                        type="button"
                        onClick={() =>
                          this.doOpenSelectdValues(
                            row[fields.values.name],
                          )
                        }
                      >
                        {i18n('common.view')}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <Pagination
          onChange={this.doChangePagination}
          disabled={loading}
          pagination={pagination}
        />
      </TableWrapper>
    );
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    rows: selectors.selectRows(state),
    pagination: selectors.selectPagination(state),
    filter: selectors.selectFilter(state),
    hasRows: selectors.selectHasRows(state),
    sorter: selectors.selectSorter(state),
  };
}

export default connect(select)(AuditLogTable);
