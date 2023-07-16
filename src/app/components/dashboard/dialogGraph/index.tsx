import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "next/image";
import LineChart from "./graph";
import { Transaction } from "@/app/types/walletType";

type DepositData = Transaction[] | null;
type WithdrawalData = Transaction[] | null;

interface Props {
  depositData: DepositData;
  withdrawalData: WithdrawalData;
}

export default function GraphDialog({ depositData, withdrawalData }: Props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <Image src="/basic/bar-chart.png" width={30} height={30} alt="+" />
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Gráfico de despesa</DialogTitle>
        <DialogContent style={{ width: "600px", height: "400px" }}>
          <LineChart
            depositData={depositData}
            withdrawalData={withdrawalData}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
