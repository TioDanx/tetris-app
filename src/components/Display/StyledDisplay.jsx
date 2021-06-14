import styled from 'styled-components';

export const StyledDisplay = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin: 10px 5px 10px 5px;
    padding: 20px 2px;
    border: 4px solid #333;
    min-height: 50px;
    min-width: 140px;
    width: 100%;
    border-radius: 20px;
    color: ${props => (props.gameOver ? 'red' : '#999')};
    background: #000;
    font-size: 0.8rem;
`