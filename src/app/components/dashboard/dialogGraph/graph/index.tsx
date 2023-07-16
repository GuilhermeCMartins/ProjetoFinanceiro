import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Transaction } from "@/app/types/walletType";
import { format } from "date-fns";

type DepositData = Transaction[] | null;
type WithdrawalData = Transaction[] | null;

interface Props {
  depositData: DepositData;
  withdrawalData: WithdrawalData;
}

const formatDateWallet = (timestamp: any) => {
  const date = new Date(parseInt(timestamp));
  const formattedDate = format(date, "dd/MM");
  return formattedDate;
};

const LineChart = ({ depositData, withdrawalData }: Props) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    console.log(depositData, withdrawalData);
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        new Chart(ctx, {
          type: "line",
          data: {
            labels: depositData?.map((transaction) =>
              formatDateWallet(transaction.date)
            ),
            datasets: [
              {
                label: "Depósitos",
                data: depositData?.map((transaction) => transaction.amount),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                tension: 0.4,
                fill: true,
              },
              {
                label: "Pagamentos",
                data: withdrawalData?.map((transaction) => transaction.amount),
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 2,
                tension: 0.4,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            elements: {
              point: {
                radius: 0,
              },
            },
          },
        });
      }
    }
  }, []);

  return <canvas ref={chartRef} />;
};

export default LineChart;
