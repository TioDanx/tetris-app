import React from 'react';
import {StyledDisplay} from './StyledDisplay';
const Display = ({gameOver, text, children}) => {
  return <StyledDisplay>{text}{children}</StyledDisplay>;
}

export default Display;