import React, { useCallback, useRef } from 'react';
import { FiMail, FiUser, FiArrowLeft, FiLock } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SingUpFormData {
  name: string;
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: Yup.string().min(6, 'No mínimo 6 dítigos'),
});

const SingUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingUpFormData>({
    resolver: yupResolver(schema) as any,
  });
  const { addToast } = useToast();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: SingUpFormData) => {
      try {
        await api.post('/users', data);

        navigate('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você ja pode fazer o seu logon no GoBarber!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
        });
      }
    },
    [addToast, navigate],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Faça seu cadastro</h1>

            <Input
              icon={FiUser}
              placeholder="Nome"
              {...register('name')}
              error={errors.name?.message}
            />
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
            <Button type="submit">Cadastrar</Button>
          </form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SingUp;
