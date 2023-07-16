"use client";

import { useEffect, useState, useMemo } from "react";
import AccountMenu from "../components/dashboard/account-menu";
import Cards from "../components/basic/cards";
import Container from "../components/basic/container";
import General from "../components/basic/generalContainer";
import Navbar from "../components/basic/navbar";
import LinearWithValueLabel from "../components/dashboard/progress-bar";
import Sidebar from "../components/sidebar";
import Links from "../components/sidebar/links";
import Title from "../components/dashboard/title";
import TransactionGrid from "../components/dashboard/transaction-grid";
import useAuth from "@/app/store/useAuth";
import useWallet from "@/app/store/useWallet";
import { getWalletByUserId } from "../utils/wallet/getWalletByUserId";
import NewTransaction from "../components/dashboard/new-transaction";
import Image from "next/image";
import CreditCardContainer from "../components/dashboard/creditcard-container";
import TextMiniCards from "../components/basic/cards/text-mini-cards";
import withAuth from "../HOCs";
import FormDialog from "../components/dashboard/dialog-objective";
import Graphs from "../components/dashboard/graphs";

import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import GraphDialog from "../components/dashboard/dialogGraph";
import { Transaction } from "../types/walletType";
SwiperCore.use([Navigation]);

const Page = () => {
  const { user } = useAuth();
  const { setWalletData, walletData } = useWallet();
  const [depositData, setDepositData] = useState<Transaction[]>();
  const [withdrawData, setWithdrawData] = useState<Transaction[]>();

  useEffect(() => {
    if (user) {
      const fetchWallet = async () => {
        try {
          const walletData = await getWalletByUserId(user.id);
          setWalletData(walletData);

          const depositTransactions = walletData?.transactions.filter(
            (transaction) => transaction.type === "deposit"
          );
          const withdrawalTransactions = walletData?.transactions.filter(
            (transaction) => transaction.type === "withdrawal"
          );

          setDepositData(depositTransactions);
          setWithdrawData(withdrawalTransactions);
        } catch (error) {
          console.log("Erro ao obter a carteira:", error);
        }
      };

      fetchWallet();
    }
  }, [user, setWalletData]);

  const totalDeposits = depositData?.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
  const totalWithdrawals = withdrawData?.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  const categoryExpenses = useMemo(() => {
    if (!walletData || !withdrawData) return {};

    const categoryExpensesMap: { [categoryId: string]: number } = {};
    const totalExpenses = withdrawData.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    withdrawData.forEach((transaction) => {
      const { category, amount } = transaction;

      if (categoryExpensesMap[category?.id]) {
        categoryExpensesMap[category?.id] += amount;
      } else {
        categoryExpensesMap[category?.id] = amount;
      }
    });

    const categoryPercentageMap: { [categoryId: string]: number } = {};

    walletData.categories.forEach((category) => {
      const categoryExpense = categoryExpensesMap[category.id] || 0;
      const categoryPercentage = (categoryExpense / totalExpenses) * 100;

      categoryPercentageMap[category.id] = categoryPercentage;
    });

    return categoryPercentageMap;
  }, [walletData, withdrawData]);

  return (
    <General>
      <Sidebar>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <Image src="/sidebar/logo.svg" width={55} height={55} alt="" />
          <h4>Financial </h4>
        </div>

        <Links />
      </Sidebar>
      <Container>
        <Navbar>
          <Title>
            <h1>Registro Semanal</h1>
            <h3>Veja o resumo das suas transações semanais aqui</h3>
          </Title>
          <AccountMenu />
        </Navbar>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: "2rem",
          }}
        >
          <div>
            <Cards container="cards">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h1>Cartão de crédito</h1>
                <GraphDialog
                  depositData={depositData || []}
                  withdrawalData={withdrawData || []}
                />
              </div>

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
              <h3>Histórico de transações</h3>
              {walletData?.transactions ? (
                <TransactionGrid wallet={walletData} />
              ) : (
                <p>Sem transações realizadas.</p>
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
                <p>Sem objetivos registrados.</p>
              )}
            </div>

            <div style={{ marginTop: "1rem", marginBottom: "2rem" }}>
              <h3>Estatísticas de resultados</h3>
              <Graphs>
                {walletData?.categories.map((category) => (
                  <LinearWithValueLabel
                    key={category.id}
                    title={category.name}
                    percentage={categoryExpenses[category.id] || 0}
                  />
                ))}
              </Graphs>
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
