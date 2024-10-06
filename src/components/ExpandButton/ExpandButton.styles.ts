import styled, { css } from 'styled-components';
import { Button } from '../../styles';

export const ExpandButtonUI = styled(Button)<{ $isHidden?: boolean; $isExpand: boolean }>`
  color: #2a8bce;
  font-size: 20px;
  min-width: 10px;
  transform: ${({ $isExpand }) => ($isExpand ? 'rotate(90deg)' : 'none')};
  transition: 0.5s;
  ${({ $isHidden }) =>
    $isHidden &&
    css`
      visibility: hidden;
    `};
`;
