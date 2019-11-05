import _ from 'lodash';

export function paginate(currentPage, pageSize, data) {
  const start = currentPage * pageSize - pageSize;
  return _(data)
    .slice(start)
    .take(pageSize)
    .value();
}
