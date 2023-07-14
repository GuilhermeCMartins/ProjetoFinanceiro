type Transaction = {
    id: string;
    description: string;
    amount: number;
    category: string;
    type: string;
};

type Category = {
    id: string;
    name: string;
};

type Goal = {
    id: string;
    description: string;
    targetAmount: number;
    currentAmount: number;
    deadline: Date;
};

export type WalletData = {
    walletId: string;
    balance: number;
    transactions: Transaction[];
    categories: Category[];
    goals: Goal[];
};

