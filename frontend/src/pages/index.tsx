import { useForm } from "react-hook-form";
import { LoginUserQuery, useLoginUserLazyQuery } from "@/generated/graphql-types";
import { ApolloError } from "@apollo/client";
import { AUTH_TOKEN_LOCAL_STORAGE_KEY } from "./admin/createUser";
import { useContext, useEffect } from "react";
import { AuthContext, AuthContextType } from "@/contexts/authContext";
import { useRouter } from "next/router";

interface LoginFormData {
  email: string;
  password: string;
}


export default function LoginPage() {

  const { email, creationTime, setToken } = useContext<AuthContextType>(AuthContext);

  const router = useRouter();

  const [sendLoginQuery, { loading, error }] = useLoginUserLazyQuery({
    onCompleted: (data: LoginUserQuery) => {
      const token: string = data.login;
      console.log('login succeeded: ' + token);

      setToken(token);
    },
    onError: (error: ApolloError) => {
      console.error('login failed', error);
    }
  });

  const { handleSubmit, register } = useForm<LoginFormData>();

  const onLoginFormSubmitted = (formData: LoginFormData) => {
    console.log('form data', formData);

    delete router.query.message;

    sendLoginQuery({
      variables: formData
    });
  };

  if (email != null) {
    router.push({
      pathname: '/myAccount',
      query: router.query
    });
  }

  return (
    <>
      <h2>Connexion</h2>

      {router.query.message &&
        <div style={{ color: 'orange', fontStyle: 'italic', fontSize: '1.5em' }}>
          {router.query.message}
        </div>}

      <form onSubmit={handleSubmit(onLoginFormSubmitted)}>

        <input type="text" {...register('email', { required: true })} placeholder="Email" /> <br />
        <input type="password" {...register('password', { required: true })} placeholder="Mot de passe" /> <br />

        <input type="submit" value="Se connecter" /> <br />
        {loading && 'Loading...'}<br />
        {error && 'Une erreur est survenue, merci de réessayer...'}<br />

      </form>
    </>
  );
}
