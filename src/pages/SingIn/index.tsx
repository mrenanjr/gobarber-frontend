import React, { useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router';

import { yupResolver } from '@hookform/resolvers/yup';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
  email: string;
  password: string;
}

// Definição do esquema de validação com Yup
const schema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: Yup.string().required('Senha obrigatória'),
});

const SingIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({ resolver: yupResolver(schema), shouldFocusError: false });

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignInFormData> = useCallback(
    async (data: SignInFormData, event) => {
      event?.preventDefault();

      try {
        await signIn({
          email: data.email,
          password: data.password,
        });

        navigate('/dashboard');
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao fazer login, cheque suas credenciais.',
        });
      }
    },
    [signIn, addToast, navigate],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Faça seu logon</h1>
            <Input
              icon={FiMail}
              placeholder="Email"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              icon={FiLock}
              type="password"
              placeholder="Senha"
              {...register('password')}
              error={errors.password?.message}
            />
            <Button type="submit">Entrar</Button>
            <Link to="forgot-password">Esqueci minha senha</Link>
          </form>
          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default SingIn;
