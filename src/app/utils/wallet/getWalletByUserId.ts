import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { WalletData } from "../../app/types/walletType";

export const getWalletByUserId = async (userId: string): Promise<WalletData | null> => {
    try {
        const walletsRef = collection(db, "wallets");
        const q = query(walletsRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }

        const walletDoc = querySnapshot.docs[0];
        const walletData = walletDoc.data() as DocumentData;

        const wallet: WalletData = {
            walletId: walletDoc.id,
            balance: walletData.balance,
            categories: walletData.categories,
            goals: walletData.goals,
            transactions: walletData.transactions
        };

        return wallet;
    } catch (error) {
        console.log("Erro ao obter a carteira do usuário:", error);
        throw new Error("Não foi possível obter a carteira do usuário");
    }
};