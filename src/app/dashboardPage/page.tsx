"use client";

import { useEffect, useState, FormEvent, useMemo } from "react";
import AccountMenu from "../components/accountMenu";
import Cards from "../components/cards";
import Container from "../components/container";
import General from "../components/generalContainer";
import Navbar from "../components/navbar";
import LinearWithValueLabel from "../components/progress-bar";
import Sidebar from "../components/sidebar";
import Links from "../components/sidebar/links";
import Title from "../components/title";
import TransactionGrid from "../components/transactionGrid";
import { arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import useAuth from "@/app/store/useAuth";
import useWallet from "@/app/store/useWallet";
import { getWalletByUserId } from "../utils/wallet/getWalletByUserId";
import { db } from "../utils/firebase/firebase";
import NewTransaction from "../components/newTransaction";
import Image from "next/image";
import CreditCardContainer from "../components/CreditCardContainer";
import TextMiniCards from "../components/text-mini-cards";
import withAuth from "../HOCs";
import FormDialog from "../components/dialogCategory";

import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
SwiperCore.use([Navigation]);

const links = [
  {
    label: "Overview",
    href: "/dashboardPage",
    image: "/basic/overview.svg",
    imageActive: "/basic/overviewActive.svg",
  },
  {
    label: "Transactions",
    href: "/dashboard/transactions",
    image: "/basic/transaction.svg",
    imageActive: "/basic/transactionActive.svg",
  },
  {
    label: "Goals",
    href: "/dashboard/goals",
    image: "/basic/goals.svg",
    imageActive: "/basic/goalsActive.svg",
  },
  {
    label: "Logout",
    href: "/logout",
    image: "/basic/settings.svg",
    imageActive: "/basic/settingsActive.svg",
  },
];

const Page = () => {
  const { user } = useAuth();
  const { setWalletData, walletData } = useWallet();
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState("");
  const [newGoal, setNewGoal] = useState("");

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

  const depositTransactions = walletData?.transactions?.filter(
    (transaction) => transaction.type === "deposit"
  );
  const withdrawalTransactions = walletData?.transactions?.filter(
    (transaction) => transaction.type === "withdrawal"
  );

  const totalDeposits = depositTransactions?.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
  const totalWithdrawals = withdrawalTransactions?.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  const categoryExpenses = useMemo(() => {
    if (!walletData || !withdrawalTransactions) return {};

    const categoryExpensesMap: { [categoryId: string]: number } = {};
    const totalExpenses = withdrawalTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    withdrawalTransactions.forEach((transaction) => {
      const { category, amount } = transaction;

      if (categoryExpensesMap[category.id]) {
        categoryExpensesMap[category.id] += amount;
      } else {
        categoryExpensesMap[category.id] = amount;
      }
    });

    const categoryPercentageMap: { [categoryId: string]: number } = {};

    walletData.categories.forEach((category) => {
      const categoryExpense = categoryExpensesMap[category.id] || 0;
      const categoryPercentage = (categoryExpense / totalExpenses) * 100;

      categoryPercentageMap[category.id] = categoryPercentage;
    });

    return categoryPercentageMap;
  }, [walletData, withdrawalTransactions]);

  const walletsCollectionRef = collection(db, "wallets");

  return (
    <General>
      <Sidebar>
        <h2>Financial APP</h2>
        <Links items={links} />
      </Sidebar>
      <Container>
        <Navbar>
          <Title>
            <h1>Registro Semanal</h1>
            <h3>Veja o resumo das suas transações semanais aqui</h3>
          </Title>
          <AccountMenu />
        </Navbar>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div>
            <Cards container="cards">
              <h1>Cartão de crédito</h1>
              <div style={{ display: "flex" }}>
                <CreditCardContainer type="left">
                  <Image
                    src="/basic/card.svg"
                    width={320}
                    height={206}
                    alt=""
                  />
                </CreditCardContainer>
                <CreditCardContainer type="right">
                  <CreditCardContainer balance="current">
                    <h3>
                      <span>$</span>
                      {walletData?.balance}
                    </h3>
                    <h4>Balanço atual</h4>
                  </CreditCardContainer>
                  <CreditCardContainer balance="income">
                    <h3>
                      <span>$</span> {totalDeposits}
                    </h3>
                    <h4>Depósitos</h4>
                  </CreditCardContainer>
                  <CreditCardContainer balance="outcome">
                    <h3>
                      <span>$</span> {totalWithdrawals}
                    </h3>
                    <h4>Saques</h4>
                  </CreditCardContainer>
                </CreditCardContainer>
              </div>
            </Cards>
            <Cards container="transactionHistory">
              <h3>Transaction history</h3>
              {walletData?.transactions ? (
                <TransactionGrid wallet={walletData} />
              ) : (
                <p>No transactions found.</p>
              )}
            </Cards>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>Objetivos</h1>
              <FormDialog />
            </div>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                maxWidth: "500px",
              }}
            >
              {walletData?.goals && walletData.goals.length > 0 ? (
                <Swiper
                  breakpoints={{
                    2000: {
                      slidesPerView: Math.min(walletData.goals.length, 3),
                      slidesPerGroup: 1,
                      spaceBetween: 30,
                    },
                    1600: {
                      slidesPerView: Math.min(walletData.goals.length, 3),
                      slidesPerGroup: 1,
                      spaceBetween: 30,
                    },
                    1450: {
                      slidesPerView: Math.min(walletData.goals.length, 3),
                      slidesPerGroup: 1,
                      spaceBetween: 30,
                    },
                  }}
                  navigation={true}
                  modules={[Navigation]}
                  centeredSlides={true}
                  preventInteractionOnTransition={true}
                  className="mySwiper"
                >
                  {walletData.goals.map((goal) => (
                    <SwiperSlide key={goal.id}>
                      <Cards container="miniCards">
                        <TextMiniCards>
                          <h3>R${goal.targetAmount}</h3>
                        </TextMiniCards>
                        <h3>{goal.description}</h3>
                      </Cards>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <p>No goals found.</p>
              )}
            </div>

            <div>
              <h3>Estatísticas de resultados</h3>
              {walletData?.categories.map((category) => (
                <LinearWithValueLabel
                  key={category.id}
                  title={category.name}
                  percentage={categoryExpenses[category.id] || 0}
                />
              ))}
            </div>
            <Cards container="newTransaction">
              <h3>Nova transação</h3>
              <NewTransaction />
            </Cards>
          </div>
        </div>
      </Container>
    </General>
  );
};

export default withAuth(Page);
