import { useForm } from "react-hook-form";
import { LoginUserQuery, useLoginUserLazyQuery } from "@/generated/graphql-types";
import { ApolloError } from "@apollo/client";
import { AUTH_TOKEN_LOCAL_STORAGE_KEY } from "./admin/createUser";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "@/contexts/authContext";
import { withAutorization } from "@/components/withAuthorization";
import { useRouter } from "next/router";


const MyAccountPage = () => {

  const { email, expirationTime, creationTime, setToken } = useContext<AuthContextType>(AuthContext);

  const router = useRouter();

  function logout() {
    setToken(null);
  }

  return (
    <>
      <h2>Mon compte</h2>

      {router.query.message &&
        <div style={{ color: 'orange', fontStyle: 'italic', fontSize: '1.5em' }}>
          {router.query.message}
        </div>}

      <label role="note" aria-label="your email">
      {email && `Votre email: ${email}`}
      </label>

      <br />
      {creationTime && `Connecté depuis: ${creationTime.toISOString()}`}<br />
      {expirationTime && `Connecté jusqu'à: ${expirationTime.toISOString()}`}<br />

      <div style={{textAlign: 'center'}} onClick={() => logout()}>
        <button>Se déconnecter</button>
      </div>

    </>
  );
};

export default withAutorization(MyAccountPage);
