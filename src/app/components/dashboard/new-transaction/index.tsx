import useWallet from "@/app/store/useWallet";
import { db } from "@/app/utils/firebase/firebase";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import { arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { WalletData, Category, Transaction } from "@/app/types/walletType";
import { ContainerNewTransaction } from "./style";
import { toast } from "react-toastify";

export default function NewTransaction() {
  const [newTransaction, setNewTransaction] = useState("");
  const [newTransactionAmount, setNewTransactionAmount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [transactionType, setTransactionType] = useState("deposit");
  const { setWalletData, walletData } = useWallet();

  const handleValidationErrors = () => {
    if (newTransactionAmount <= 0) {
      toast.error("O valor tem que ser maior que zero");
      return true;
    }

    if (!selectedCategory) {
      toast.error("Escolha uma categoria.");
      return true;
    }

    if (!transactionType) {
      toast.error("Escolha uma categoria de transação.");
      return true;
    }

    if (!newTransaction) {
      toast.error("A descrição não pode estar em branco.");
      return true;
    }

    if (!walletData) {
      toast.error("Wallet data not available.");
      return true;
    }

    if (
      transactionType === "withdrawal" &&
      newTransactionAmount > walletData.balance
    ) {
      toast.error("Saldo insuficiente para efetuar o pagamento.");
      return true;
    }

    return false; 
  };

  const addTransaction = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (handleValidationErrors()) {
      return;
    }

    const newTransactionData: Transaction = {
      id: Date.now().toString(),
      description: newTransaction,
      amount: newTransactionAmount,
      category: selectedCategory || { id: "", name: "" },
      type: transactionType,
      date: Date.now().toString(),
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

        setNewTransaction("");
        setNewTransactionAmount(0);
        setSelectedCategory(null);
        setTransactionType("deposit");
        toast.success("Transação feita com sucesso.");
      } catch (error) {
        toast.error("Erro ao adicionar transação no Firestore.");
      }
    }
  };

  const walletsCollectionRef = collection(db, "wallets");

  return (
    <form onSubmit={addTransaction}>
      <ContainerNewTransaction type="principle">
        <ContainerNewTransaction type="left">
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
        </ContainerNewTransaction>

        <ContainerNewTransaction type="right">
          <Select
            value={selectedCategory?.id || ""}
            onChange={(event) => {
              const categoryId = event.target.value;
              const selectedCategory = walletData?.categories?.find(
                (category) => category.id === categoryId
              );
              setSelectedCategory(selectedCategory || null);
            }}
            displayEmpty
            renderValue={(value) =>
              value === ""
                ? "Escolha uma categoria"
                : selectedCategory?.name || ""
            }
            sx={{ minWidth: "200px" }}
            size="small"
          >
            <MenuItem value="">
              <em>Escolha uma categoria</em>
            </MenuItem>
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
            <MenuItem value="">
              <em>Tipo de transação</em>
            </MenuItem>
            <MenuItem value="deposit">Depósito</MenuItem>
            <MenuItem value="withdrawal">Pagamento</MenuItem>
          </Select>
        </ContainerNewTransaction>
      </ContainerNewTransaction>

      <Button type="submit" variant="contained" style={{ marginTop: "1rem" }}>
        Adicionar Transação
      </Button>
    </form>
  );
}
