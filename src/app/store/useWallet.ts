import { create } from "zustand";
import { WalletData } from "@/app/types/walletType";

type State = {
    walletData: WalletData | null;
    setWalletData: (walletData: WalletData | null) => void;
};

const useWallet = create<State>((set) => ({
    walletData: null,
    setWalletData: (walletData) => {
        set((prevState) => ({
            ...prevState,
            walletData,
        }));
    },
}));

export default useWallet;
