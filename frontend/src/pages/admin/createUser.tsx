import { useForm } from "react-hook-form";
import { CreateUserMutation, useCreateUserMutation } from "@/generated/graphql-types";
import { ApolloError } from "@apollo/client";
import { withAutorization } from "@/components/withAuthorization";
import { AuthRole } from "@/contexts/authContext";

interface CreateUserFormData {
  email: string;
  role: string;
  password: string;
}

export const AUTH_TOKEN_LOCAL_STORAGE_KEY = 'authToken';

const CreateUserPage = () => {

  const [sendCreateUserMutation, { loading, error, data }] = useCreateUserMutation({
    onCompleted: (data: CreateUserMutation) => {
      const { id } = data.createUser;
      console.log('created user: ' + id);
    },
    onError: (error: ApolloError) => {
      console.error('created user failed', error);
    }
  });

  const { handleSubmit, register } = useForm<CreateUserFormData>();

  const onCreateUserFormSubmitted = (formData: CreateUserFormData) => {
    console.log('form data', formData);

    sendCreateUserMutation({
      variables: formData
    });
  };

  return (
    <>
      <h2>Create user</h2>

      <form onSubmit={handleSubmit(onCreateUserFormSubmitted)}>

        <input type="text" {...register('email', { required: true })} placeholder="Email" /> <br />
        <input type="text" {...register('role', { required: true })} placeholder="Role" /> <br />
        <input type="password" {...register('password', { required: true })} placeholder="Mot de passe" /> <br />

        <input type="submit" value="Enregistrer" /> <br />
        {loading && 'Loading...'}
        {error && 'Une erreur est survenue, merci de réessayer...'}
        {data && `Utilisateur créé avec l'ID ${data.createUser.id}`}

      </form>
    </>
  );
}

export default withAutorization(CreateUserPage, AuthRole.ADMIN);