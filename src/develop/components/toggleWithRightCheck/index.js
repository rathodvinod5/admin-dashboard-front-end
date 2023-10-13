import React, { useEffect, useState } from 'react';
import { ToggleButton } from '@mui/material';
import { Check } from '@mui/icons-material';

const ToggleWithRightCheck = (props) => {
    const { backgroundColor, onClickSelected, showCheck, index } = props;
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if(showCheck !== selected)
            setSelected(!selected);
    }, [showCheck]);

    return(
        <ToggleButton
            value="check"
            sx={{ 
                backgroundColor,
                width: '40px',
                height: '40px',
                marginRight: 1.2, 
                borderWidth: 0,
                ':hover': { backgroundColor, } 
            }}
            // selected={selected}
            onChange={() => {
                // setButtonIndex(0);
                setSelected(!selected);
                onClickSelected(index);
            }}
        >
            <Check sx={{ color: selected && showCheck ? '#ffffff' : 'transparent' }} />
        </ToggleButton>
    );
}

export default ToggleWithRightCheck;