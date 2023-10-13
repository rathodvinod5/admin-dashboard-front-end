import React from 'react';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PaperItemByMe = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    // padding: 20,
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '10px 10px 10px 15px',
    marginTop: '15px',
    borderRadius: 6,
    borderTopRightRadius: 0,
    // boxShadow: 'rgba(133,129,133,1)'
}));

export const PaperItemByThem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    // padding: 20,
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '10px 10px 10px 15px',
    marginTop: '15px',
    borderRadius: 6,
    borderTopLeftRadius: 0,
    // boxShadow: 'rgba(133,129,133,1)'
}));

export default {};

// PaperItem.propTypes = {
//     currentItemSelected: PropTypes.number,
// }
// PaperItem.defaultProps = {
//     currentItemSelected: -1,
// }