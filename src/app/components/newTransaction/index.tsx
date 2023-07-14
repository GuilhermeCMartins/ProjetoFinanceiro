import useWallet from "@/app/store/useWallet";
import { db } from "@/app/utils/firebase/firebase";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import { arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { WalletData, Category, Transaction } from "@/app/types/walletType";

export default function NewTransaction() {
  const [newTransaction, setNewTransaction] = useState("");
  const [newTransactionAmount, setNewTransactionAmount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [transactionType, setTransactionType] = useState("deposit");
  const { setWalletData, walletData } = useWallet();

  const addTransaction = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedCategory) {
      const newTransactionData: Transaction = {
        id: Date.now().toString(),
        description: newTransaction,
        amount: newTransactionAmount,
        category: selectedCategory,
        type: transactionType,
      };

      if (walletData) {
        const updatedWalletData: WalletData = {
          ...walletData,
          transactions: [...walletData.transactions, newTransactionData],
          balance:
            transactionType === "deposit"
              ? walletData.balance + newTransactionAmount
              : walletData.balance - newTransactionAmount,
        };

        setWalletData(updatedWalletData);

        try {
          await updateDoc(doc(walletsCollectionRef, walletData.walletId), {
            transactions: arrayUnion(newTransactionData),
            balance: updatedWalletData.balance,
          });
        } catch (error) {
          console.log("Erro ao adicionar transação no Firestore:", error);
        }
      }
    }

    setNewTransaction("");
    setNewTransactionAmount(0);
  };

  const walletsCollectionRef = collection(db, "wallets");

  return (
    <form onSubmit={addTransaction}>
      <div style={{ display: "flex", gap: "1rem", marginTop: ".5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            label="Descrição"
            value={newTransaction}
            onChange={(event) => setNewTransaction(event.target.value)}
            sx={{ width: "200px" }}
            size="small"
          />
          <TextField
            label="Valor"
            type="number"
            value={newTransactionAmount}
            onChange={(event) =>
              setNewTransactionAmount(Number(event.target.value))
            }
            sx={{ width: "200px" }}
            size="small"
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Select
            value={selectedCategory?.id || ""}
            onChange={(event) => {
              const categoryId = event.target.value;
              const selectedCategory = walletData?.categories?.find(
                (category) => category.id === categoryId
              );
              setSelectedCategory(selectedCategory || null);
            }}
            sx={{ minWidth: "200px" }}
            size="small"
          >
            <MenuItem value="">Escolha uma categoria</MenuItem>
            {walletData?.categories?.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={transactionType}
            onChange={(event) => {
              setTransactionType(event.target.value as string);
            }}
            sx={{ minWidth: "200px" }}
            size="small"
          >
            <MenuItem value="deposit">Depósito</MenuItem>
            <MenuItem value="withdrawal">Saque</MenuItem>
          </Select>
        </div>
      </div>

      <Button type="submit" variant="contained" style={{ marginTop: "1rem" }}>
        Adicionar Transação
      </Button>
    </form>
  );
}
