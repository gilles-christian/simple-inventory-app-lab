import { createSelector } from 'reselect';

const selectRaw = (state) => state.customer.destroy;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => !!raw.loading,
);

export default {
  selectLoading
};

