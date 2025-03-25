import React from 'react';
import { useTransition } from 'react-spring';
import { ToastMessage } from '../../hooks/toast';
import { Container } from './styles';
import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const transitions = useTransition(messages, {
    keys: message => message.id,
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  });

  return (
    <Container>
      {transitions((style, item) => (
        <Toast style={style} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
