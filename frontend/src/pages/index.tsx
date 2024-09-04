import { useForm } from "react-hook-form";
import { LoginUserQuery, useLoginUserLazyQuery } from "@/generated/graphql-types";
import { ApolloError } from "@apollo/client";

interface LoginFormData {
  email: string;
  password: string;
}

export const AUTH_TOKEN_LOCAL_STORAGE_KEY = 'authToken';

export default function LoginPage() {

  const [sendLoginQuery, { loading, error }] = useLoginUserLazyQuery({
    onCompleted: (data: LoginUserQuery) => {
      const token: string = data.login;
      console.log('login succeeded: ' + token);

      localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, token);
    },
    onError: (error: ApolloError) => {
      console.error('login failed', error);
    }
  });

  const { handleSubmit, register } = useForm<LoginFormData>();

  const onLoginFormSubmitted = (formData: LoginFormData) => {
    console.log('form data', formData);
    
    sendLoginQuery({
      variables: formData
    });
  };

  return (
    <>
      <h2>Connexion</h2>

      <form onSubmit={handleSubmit(onLoginFormSubmitted)}>

        <input type="text" {...register('email', { required: true })} placeholder="Email" /> <br />
        <input type="password" {...register('password', { required: true })} placeholder="Mot de passe" /> <br />

        <input type="submit" value="Se connecter" /> <br />
        {loading && 'Loading...'}
        {error && 'Une erreur est survenue, merci de réessayer...'}

      </form>
    </>
  );
}
