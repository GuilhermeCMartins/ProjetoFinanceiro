"use client";
import { useState, ChangeEvent } from "react";
import { TextField, Button, FormControl } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useAuth from "@/app/store/useAuth";
import ContainerForm from "../components/register/form";
import FormRegister from "../components/register/container";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await signIn(email, password);
      toast.success("Usuário logado com sucesso.");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Algo deu errado com o login.");
    }
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <ContainerForm>
      <FormRegister>
        <h1>Login</h1>
        <TextField label="Email" value={email} onChange={handleEmailChange} />
        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Entrar
        </Button>
      </FormRegister>
    </ContainerForm>
  );
}
