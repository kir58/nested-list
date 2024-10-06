import styled from 'styled-components';

export const Container = styled.div`
  margin-left: 20px;
`;

export const List = styled.ul`
  list-style-type: none;
  padding-left: 20px;
`;

export const Button = styled.button`
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;

    :disabled {
        color: #acb5ac;
        cursor: not-allowed;
    }
`;
