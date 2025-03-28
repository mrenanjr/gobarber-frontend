import styled, { css } from 'styled-components';

import Tootip from '../Tooltip';

interface ContainerProps {
  $isFocused: boolean;
  $isFilled: boolean;
  $isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #232129;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.$isErrored &&
    css`
      border: 2px solid #c53030;
    `}

  ${props =>
    props.$isFocused &&
    css`
      border: 2px solid #ff9000;
      color: #ff9000;
    `}

  ${props =>
    props.$isFilled &&
    css`
      color: #ff9000;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
    ${props => props.$isErrored && 'color: #c53030;'}
    ${props => props.$isFocused && 'color: #ff9000;'}
    ${props => props.$isFilled && 'color: #ff9000;'}
  }
`;

export const Error = styled(Tootip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
