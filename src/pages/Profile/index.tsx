import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import { AvatarInput, Container, Content } from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const schemaP = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  old_password: Yup.string(),
  password: Yup.string().when('old_password', (old_password, schema) =>
    old_password && old_password.length > 0
      ? schema.required('Campo obrigatório')
      : schema,
  ),
  password_confirmation: Yup.string()
    .when('old_password', (old_password, schema) =>
      old_password && old_password.length > 0
        ? schema.required('Campo obrigatório')
        : schema,
    )
    .oneOf([Yup.ref('password')], 'Confirmação incorreta'),
});

const Profile: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(schemaP) as any,
  });
  const { addToast } = useToast();
  const navigate = useNavigate();

  const { user, updateUser } = useAuth();

  const onSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        const { name, email, old_password, password, password_confirmation } =
          data;

        const formData = {
          name,
          email,
          ...(old_password
            ? { old_password, password, password_confirmation }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        navigate('/dashboard');

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'Suas informações do perfil foram atualizadas com sucesso!',
        });
      } catch (err) {
        // if (err instanceof Yup.ValidationError) {
        //   formRef.current?.setErrors(getValidationErrors(err));

        //   return;
        // }

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao atualizar o perfil, tente novamente.',
        });
      }
    },
    [addToast, navigate, updateUser],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar atualizado',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />

              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input
            icon={FiUser}
            placeholder="Nome"
            defaultValue={user.name}
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            icon={FiMail}
            placeholder="Email"
            defaultValue={user.email}
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            containerStyle={{ marginTop: 24 }}
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
            {...register('old_password')}
            error={errors.old_password?.message}
          />

          <Input
            icon={FiLock}
            type="password"
            placeholder="Nova senha"
            {...register('password')}
            error={errors.password?.message}
          />

          <Input
            icon={FiLock}
            type="password"
            placeholder="Confirmar senha"
            {...register('password_confirmation')}
            error={errors.password_confirmation?.message}
          />

          <Button type="submit">Confirmar mudanças</Button>
        </form>
      </Content>
    </Container>
  );
};

export default Profile;
