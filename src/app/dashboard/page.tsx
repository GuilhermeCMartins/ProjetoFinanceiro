"use client";
import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import useAuth from "@/app/store/useAuth";
import useWallet from "@/app/store/useWallet";
import { collection, updateDoc, arrayUnion, doc } from "firebase/firestore";
import withAuth from "../HOCs";
import { db } from "../utils/firebase/firebase";
import { getWalletByUserId } from "../utils/wallet/getWalletByUserId";

const Page = () => {
  const { user } = useAuth();
  const { setWalletData, walletData } = useWallet();
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState("");
  const [newGoal, setNewGoal] = useState("");
  const [newTransaction, setNewTransaction] = useState("");
  const [newTransactionAmount, setNewTransactionAmount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [transactionType, setTransactionType] = useState("deposit");

  useEffect(() => {
    if (user) {
      const fetchWallet = async () => {
        try {
          const walletData = await getWalletByUserId(user.id);
          setWalletData(walletData);
          setLoading(false);
        } catch (error) {
          console.log("Erro ao obter a carteira:", error);
          setLoading(false);
        }
      };

      fetchWallet();
    }
  }, [user, setWalletData]);

  const addCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newCategoryData = {
      id: Date.now().toString(),
      name: newCategory,
    };

    if (walletData) {
      const updatedWalletData = {
        ...walletData,
        categories: [...walletData.categories, newCategoryData],
      };

      setWalletData(updatedWalletData);

      try {
        await updateDoc(doc(walletsCollectionRef, walletData.walletId), {
          categories: arrayUnion(newCategoryData),
        });
      } catch (error) {
        console.log("Erro ao adicionar categoria no Firestore:", error);
      }
    }

    setNewCategory("");
  };

  const addGoal = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newGoalData = {
      id: Date.now().toString(),
      description: newGoal,
      targetAmount: 0,
      currentAmount: 0,
      deadline: new Date(),
    };

    if (walletData) {
      const updatedWalletData = {
        ...walletData,
        walletId: walletData.walletId,
        goals: [...walletData.goals, newGoalData],
      };

      setWalletData(updatedWalletData);

      try {
        await updateDoc(doc(walletsCollectionRef, walletData.walletId), {
          goals: arrayUnion(newGoalData),
        });
      } catch (error) {
        console.log("Erro ao adicionar meta no Firestore:", error);
      }
    }

    setNewGoal("");
  };

  const addTransaction = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTransactionData = {
      id: Date.now().toString(),
      description: newTransaction,
      amount: newTransactionAmount,
      category: selectedCategory,
      type: transactionType,
    };

    if (walletData) {
      const updatedWalletData = {
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

    setNewTransaction("");
    setNewTransactionAmount(0);
  };

  const walletsCollectionRef = collection(db, "wallets");

  return (
    <>
      <h1>Dashboard</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          <h1>{user?.email}</h1>
          <h2>Carteira</h2>
          <p>Saldo: R${walletData?.balance}</p>
          <h2>Categorias</h2>
          {walletData?.categories?.map((category) => (
            <p key={category.id}>{category.name}</p>
          ))}
          <form onSubmit={addCategory}>
            <TextField
              label="Nome da Categoria"
              value={newCategory}
              onChange={(event) => setNewCategory(event.target.value)}
            />
            <Button type="submit" variant="contained">
              Adicionar Categoria
            </Button>
          </form>
          <h2>Metas</h2>
          {walletData?.goals?.map((goal) => (
            <p key={goal.id}>{goal.description}</p>
          ))}
          <form onSubmit={addGoal}>
            <TextField
              label="Descrição da Meta"
              value={newGoal}
              onChange={(event) => setNewGoal(event.target.value)}
            />
            <Button type="submit" variant="contained">
              Adicionar Meta
            </Button>
          </form>
          <h2>Transações</h2>
          <div>
            <h3>Saques</h3>
            {walletData?.transactions
              ?.filter((transaction) => transaction.type === "withdrawal")
              .map((transaction) => (
                <p key={transaction.id}>
                  {transaction.description} {transaction.amount}
                  {
                    walletData.categories.find(
                      (category) => category.id === transaction.category
                    )?.name
                  }
                </p>
              ))}
          </div>
          <div>
            <h3>Depósitos</h3>
            {walletData?.transactions
              ?.filter((transaction) => transaction.type === "deposit")
              .map((transaction) => (
                <p key={transaction.id}>
                  {transaction.description} {transaction.amount}
                  {
                    walletData.categories.find(
                      (category) => category.id === transaction.category
                    )?.name
                  }
                </p>
              ))}
          </div>
          <form onSubmit={addTransaction}>
            <TextField
              label="Descrição da Transação"
              value={newTransaction}
              onChange={(event) => setNewTransaction(event.target.value)}
            />
            <TextField
              label="Valor"
              type="number"
              value={newTransactionAmount}
              onChange={(event) =>
                setNewTransactionAmount(Number(event.target.value))
              }
            />
            <Select
              value={selectedCategory}
              onChange={(event) => {
                setSelectedCategory(event.target.value);
              }}
            >
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
            >
              <MenuItem value="deposit">Depósito</MenuItem>
              <MenuItem value="withdrawal">Saque</MenuItem>
            </Select>
            <Button type="submit" variant="contained">
              Adicionar Transação
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default withAuth(Page);
