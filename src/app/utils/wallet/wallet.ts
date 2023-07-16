import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

export const createWallet = async (userId: string | null, initialBalance: number) => {
    try {
        const walletsRef = collection(db, "wallets");

        const walletData = {
            userId,
            balance: initialBalance,
            transactions: [],
            categories: [
                { id: "1", name: "Alimentação" },
                { id: "2", name: "Transporte" },
                { id: "3", name: "Moradia" },
                { id: "4", name: "Entretenimento" },
                { id: "5", name: "Saúde" },
                { id: "6", name: "Educação" },
                { id: "7", name: "Vestuário" },
                { id: "8", name: "Contas e Utilidades" },
                { id: "9", name: "Viagens" },
                { id: "10", name: "Compras" },
                { id: "11", name: "Doações" },
                { id: "12", name: "Impostos" },
            ],
            goals: [],
        };

        const docRef = await addDoc(walletsRef, walletData);

        return docRef.id;
    } catch (error) {
        console.log("Erro ao criar a carteira:", error);
        throw new Error("Não foi possível criar a carteira");
    }
};
