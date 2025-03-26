import React, { useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const schema = Yup.object().shape({
  password: Yup.string().required('Senha obrigatória'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirmação incorreta')
    .required('Confirmação de senha obrigatória'),
});

const ResetPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(schema) as any,
  });

  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        const { password, password_confirmation } = data;
        const token = new URLSearchParams(location.search).get('token');

        if (!token) {
          throw new Error('Token inválido');
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        navigate('/');
      } catch (err) {
        // if (err instanceof Yup.ValidationError) {
        //   formRef.current?.setErrors(getValidationErrors(err));

        //   return;
        // }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
        });
      }
    },
    [addToast, navigate, location],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Resetar senha</h1>
            <Input
              icon={FiLock}
              type="password"
              placeholder="Senha"
              {...register('password')}
              error={errors.password?.message}
            />
            <Input
              icon={FiLock}
              type="password"
              placeholder="Confirmação de senha"
              {...register('password_confirmation')}
              error={errors.password_confirmation?.message}
            />
            <Button type="submit">Alterar senha</Button>
          </form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default ResetPassword;
