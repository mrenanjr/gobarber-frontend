import React, { InputHTMLAttributes, useCallback, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerStyle?: object;
  icon: React.ComponentType<IconBaseProps>;
  name: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  containerStyle = {},
  icon: Icon,
  name,
  error,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);

    setIsFilled(!!event.target.value);
  }, []);

  return (
    <Container
      style={containerStyle}
      $isErrored={!!error}
      $isFilled={isFilled}
      $isFocused={isFocused}
    >
      {Icon && <Icon size="20" />}
      <input
        name={name}
        onFocus={handleInputFocus}
        onBlurCapture={handleInputBlur}
        {...rest}
      />
      {!!error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
