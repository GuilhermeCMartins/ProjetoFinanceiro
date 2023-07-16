"use client";
import { useState, ChangeEvent } from "react";
import { TextField, Button, FormControl } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import signUp from "../utils/auth/signup";
import { createWallet } from "../utils/wallet/wallet";
import ContainerForm from "../components/register/form";
import FormRegister from "../components/register/container";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRegister = async () => {
    const { result, error } = await signUp(email, password);

    if (error) {
      toast.error("Erro ao cadastrar o usuário.");
    } else {
      toast.success("Usuário cadastrado com sucesso.");
      await createWallet(result?.user?.uid ?? null, 0);
      router.push("/login");
    }
  };

  return (
    <ContainerForm>
      <h1>Registro</h1>
      <FormControl>
        <TextField label="Email" value={email} onChange={handleEmailChange} />
        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button variant="contained" onClick={handleRegister}>
          Registrar
        </Button>
      </FormControl>
    </ContainerForm>
  );
}
