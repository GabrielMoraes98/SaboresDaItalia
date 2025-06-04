import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.css";

export default function AdminAuth() {
  const [formData, setFormData] = useState({});
  const [authLoading, setAuthLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleFormDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setAuthLoading(true);
    fetch("http://localhost:3000/auth/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success && result.body.token) {
          // Armazena o token e outras informações necessárias
          localStorage.setItem(
            "adminAuth",
            JSON.stringify({ token: result.body.token, email: formData.email })
          );
          navigate("/admin/dashboard");
        } else {
          alert("Credenciais inválidas!");
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setAuthLoading(false);
      });
  };

  if (authLoading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div className={styles.Container}>
      <h2>Login do Administrador</h2>
      <form onSubmit={handleSubmitForm}>
        <TextField
          required
          label="Email"
          type="email"
          name="email"
          onChange={handleFormDataChange}
        />
        <br />
        <TextField
          required
          label="Senha"
          type="password"
          name="password"
          onChange={handleFormDataChange}
        />
        <br />
        <button type="submit">Entrar como Admin</button>
      </form>
    </div>
  );
}