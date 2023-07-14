import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/app/store/useAuth";
import { User } from "@/app/types/userType";

interface ProtectedPageProps {
  user: User;
}

const withAuth = <P extends ProtectedPageProps>(
  Component: React.ComponentType<P>
) => {
  const Auth = (props: P) => {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
      if (!user) {
        router.push("/login");
      }
    }, [user, router]);

    if (!user) {
      return <p>Carregando...</p>;
    }

    return <Component {...props} />;
  };
  return Auth;
};

export default withAuth;
