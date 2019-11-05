import React from "react";
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;

  const totalPage = Math.ceil(itemsCount / pageSize); //3
  if (totalPage === 1) return null;

  //use lodash
  const pages = _.range(1, totalPage + 1 );
  //use javascript
//   const pages = [];
//   for (let i = 1; i <= totalPage; i++) pages.push(i);
  //console.log(pages);

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li className={currentPage === page ? 'page-item active' : 'page-item'} key={page}>
            <button className="page-link" onClick={() => onPageChange(page)}>{page}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
