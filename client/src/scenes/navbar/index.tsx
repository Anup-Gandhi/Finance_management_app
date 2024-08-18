import FlexBetween from '@/components/FlexBetween';
import { useTheme } from '@emotion/react'
import { Box } from '@mui/material';
import React, { useState } from 'react'

type Props = {}

const index = (props: Props) => {
    const{ palette } = useTheme();
    const[selected, setSelcted] = useState("Dashboard");

    return ( 
    <FlexBetween mb="0.25rem" 
    p= "0.5rem 0rem"
    color={palette.grey[300]}
    >
        Hey
    </FlexBetween>
  );
};

export default index