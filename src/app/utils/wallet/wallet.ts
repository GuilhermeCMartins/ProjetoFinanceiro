import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";


export const createWallet = async (userId: string | null, initialBalance: number) => {
    try {
        const walletsRef = collection(db, "wallets");

        const walletData = {
            userId,
            balance: initialBalance,
            transactions: [],
            categories: [],
            goals: [],
        };

        const docRef = await addDoc(walletsRef, walletData);

        return docRef.id;
    } catch (error) {
        console.log("Erro ao criar a carteira:", error);
        throw new Error("Não foi possível criar a carteira");
    }
};



