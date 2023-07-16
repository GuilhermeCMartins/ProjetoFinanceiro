export type Transaction = {
    id: string;
    description: string;
    amount: number;
    category: Category;
    type: string;
    date: string;
};

export type Category = {
    id: string;
    name: string;
};

export type Goal = {
    id: string;
    description: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
};

export type WalletData = {
    walletId: string;
    balance: number;
    transactions: Transaction[];
    categories: Category[];
    goals: Goal[];
};

