import { AuthContext, AuthRole } from "@/contexts/authContext";
import { useRouter } from "next/router";
import { useContext } from "react";

export const withAutorization = (ChildPage: any, ...roles: AuthRole[]) => {
    return (props: any) => {

        const router = useRouter();
        const { role } = useContext(AuthContext);
        console.log("withAutorization: role=" + role);
        const isAuthorized = role !== undefined && (roles.length == 0 || roles.includes(role));
        console.log("withAutorization: " + isAuthorized)

        if (!isAuthorized) {
            router.push({
                pathname: '/',
                query: { 
                    message: roles.length == 0 ? `Vous devez être connecté pour accéder à cette page` : `Vous n'avez pas les droits d'accéder à cette page. 
                    Contactez l'administrateur pour demander un des droits suivants : ${roles.join(', ')}` 
                }
            });
        }

        return isAuthorized ? <ChildPage {...props} /> : null;
    };
};

// function lister(...args: string[]) {
//     console.log(...args);
//     // équivalent console.log(args[0], args[1], ...);
// }
// lister("s1", "s2", "s3");