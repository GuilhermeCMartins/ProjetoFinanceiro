import { create } from "zustand";
import { User } from "@/app/types/userType";
import { signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { firebase_app } from "../utils/firebase/firebase";


type AuthState = {
    user: User | null;
    setUser: (user: User | null) => void; 
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
};

const auth = getAuth(firebase_app);

const useAuth = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    signIn: async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user: User = {
                id: result.user.uid,
                email: result.user.email,
            };
            set({ user });
        } catch (error) {
            console.log("Erro ao realizar o login:", error);
            throw new Error("Erro ao realizar o login. Verifique suas credenciais.");
        }
    },
    signOut: async () => {
        try {
            await signOut(auth);
            set({ user: null });
        } catch (error) {
            console.log("Erro ao realizar o logout:", error);
            throw new Error("Erro ao realizar o logout. Por favor, tente novamente.");
        }
    },
}));

export default useAuth;
