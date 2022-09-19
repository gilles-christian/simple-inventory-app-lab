import React, { Component } from 'react';
import { connect } from 'react-redux';
import { i18n } from 'i18n';
import TableWrapper from 'view/shared/styles/TableWrapper';
import ImporterRowStatus from 'view/shared/importer/ImporterRowStatus';
import Pagination from 'view/shared/table/Pagination';
import TableColumnHeader from 'view/shared/table/TableColumnHeader';

export default (selectors, actions, fields) => {
  class ImporterList extends Component {
    showTotal = (total, range) => {
      const {
        importedRowsCount,
        pendingRowsCount,
        errorRowsCount,
      } = this.props;
      return i18n(
        'importer.total',
        importedRowsCount,
        pendingRowsCount,
        errorRowsCount,
      );
    };

    doChangeSort = (columnKey) => {
      const { dispatch, sorter, rows } = this.props;

      const order =
        sorter.columnKey === columnKey &&
        sorter.order === 'ascend'
          ? 'descend'
          : 'ascend';

      dispatch(
        actions.doChangeSort(rows, {
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
        currentPageRows,
        pagination,
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
                    hasRows={true}
                    sorter={sorter}
                    name="_line"
                    label={i18n('importer.line')}
                  />
                  {fields.map((schemaItem) => (
                    <TableColumnHeader
                      key={schemaItem.name}
                      onSort={this.doChangeSort}
                      hasRows={true}
                      sorter={sorter}
                      name={schemaItem.name}
                      label={schemaItem.label}
                    />
                  ))}
                  <TableColumnHeader
                    onSort={this.doChangeSort}
                    hasRows={true}
                    sorter={sorter}
                    name="_status"
                    label={i18n('importer.status')}
                  />
                </tr>
              </thead>
              <tbody>
                {currentPageRows.map((row) => (
                  <tr key={row._line}>
                    <td>{row._line}</td>
                    {fields.map((schemaItem) => (
                      <td key={schemaItem.name}>
                        {row[schemaItem.name]}
                      </td>
                    ))}
                    <td>
                      <ImporterRowStatus
                        value={row._status}
                        errorMessage={row._errorMessage}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            onChange={this.doChangePagination}
            pagination={pagination}
            showTotal={this.showTotal}
          />
        </TableWrapper>
      );
    }
  }

  function select(state) {
    return {
      rows: selectors.selectRows(state),
      currentPageRows: selectors.selectCurrentPageRows(
        state,
      ),
      pendingRowsCount: selectors.selectPendingRowsCount(
        state,
      ),
      errorRowsCount: selectors.selectErrorRowsCount(state),
      importedRowsCount: selectors.selectImportedRowsCount(
        state,
      ),
      sorter: selectors.selectSorter(state),
      pagination: selectors.selectPagination(state),
    };
  }

  return connect(select)(ImporterList);
};
