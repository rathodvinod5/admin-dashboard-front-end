import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import "./styles.css";

const Paginator = ({ currentPage, totalItems, onPressPrevButton, onPressNextButton }) => {
  return(
    <div className="paginator-div">
      {currentPage > 1 ? (
        <Button
          variant="outlined"
          size="small"
          style={{ color: '#fff' }} 
          disabled={currentPage <= 1}
          onClick={onPressPrevButton}
        >
          Prev
        </Button>
      ) : null}

      <Button
        sx={{ color: '#fff' }}
        size="small"
        variant="contained"
        onClick={() => {}}
        // disabled={true}
      >
        {currentPage}
      </Button>

      {currentPage > 1 && currentPage < totalItems ? (
        <Button
          variant="outlined"
          size="small"
          style={{ color: '#fff' }} 
          disabled={currentPage >= totalItems}
          onClick={onPressNextButton}
        >
          Next
        </Button>
      ) : null}
    </div>
  );
}

export default Paginator;

Paginator.propTypes = {
  currentPage: PropTypes.number,
  totalItems: PropTypes.number,
  onPressPrevButton: PropTypes.func,
  onPressNextButton: PropTypes.fun
}

Paginator.propTypes = {
  currentPage: 1,
  totalItems: 0,
  onPressPrevButton: () => {},
  onPressNextButton: () => {}
}