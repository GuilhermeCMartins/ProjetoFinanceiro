import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

export const createTransaction = async (
    walletId: string,
    description: string,
    amount: number,
    category: string
) => {
    try {
        const transactionsRef = collection(db, `wallets/${walletId}/transactions`);

        const transactionData = {
            description,
            amount,
            category,
        };

        const docRef = await addDoc(transactionsRef, transactionData);

        return docRef.id;
    } catch (error) {
        console.log("Erro ao criar a transação:", error);
        throw new Error("Não foi possível criar a transação");
    }
};
