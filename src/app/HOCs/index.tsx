"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User as FirebaseAuthUser } from "firebase/auth";
import useAuth from "@/app/store/useAuth";
import { User } from "@/app/types/userType";
import { auth } from "../utils/firebase/firebase";
import CircularProgress from "@mui/material/CircularProgress";

interface ProtectedPageProps {
  user: User;
}

const withAuth = <P extends ProtectedPageProps>(
  Component: React.ComponentType<P>
) => {
  const Auth = (props: P) => {
    const router = useRouter();
    const { user, setUser } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (firebaseUser: FirebaseAuthUser | null) => {
          if (firebaseUser) {
            const user: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email,
            };
            setUser(user);
          } else {
            setUser(null);
            router.push("/login");
          }

          setLoading(false);
        }
      );

      return () => {
        unsubscribe();
      };
    }, [router, setUser]);

    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      );
    }

    if (!user) {
      return (
        <p>
          Você não está autenticado. Redirecionando para a página de login...
        </p>
      );
    }

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
