import { FormEvent, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "next/image";
import useWallet from "@/app/store/useWallet";
import { arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/utils/firebase/firebase";
import { toast } from "react-toastify";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const { setWalletData, walletData } = useWallet();
  const [newGoal, setNewGoal] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTargetAmount, setNewTargetAmount] = useState("");
  const [newCurrentAmount, setNewCurrentAmount] = useState("");
  const [newDeadline, setNewDeadline] = useState("");

  const addGoal = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newGoalData = {
      id: Date.now().toString(),
      description: newDescription,
      targetAmount: Number(newTargetAmount),
      currentAmount: Number(newCurrentAmount),
      deadline: new Date(newDeadline),
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

    toast.success("Objetivo adicionado com sucesso!");
    setNewGoal("");
    setNewDescription("");
    setNewTargetAmount("");
    setNewCurrentAmount("");
    setNewDeadline("");
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const walletsCollectionRef = collection(db, "wallets");

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <Image src="/basic/plusButton.svg" width={30} height={30} alt="+" />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Registrar Objetivo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Registre um novo objetivo para sua vida!
          </DialogContentText>
          <form onSubmit={addGoal}>
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Descrição"
              type="text"
              fullWidth
              variant="standard"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="targetAmount"
              label="Quantidade final"
              type="number"
              fullWidth
              variant="standard"
              value={newTargetAmount}
              onChange={(e) => setNewTargetAmount(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="currentAmount"
              label="Quantidade Atual"
              type="number"
              fullWidth
              variant="standard"
              value={newCurrentAmount}
              onChange={(e) => setNewCurrentAmount(e.target.value)}
            />
            <TextField
              margin="normal"
              id="deadLine"
              InputLabelProps={{ shrink: true }}
              label="Data final"
              type="date"
              fullWidth
              variant="standard"
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button type="submit">Confirmar</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
