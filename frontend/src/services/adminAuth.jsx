import { useState } from "react";

export default function adminAuthServices() {
  const [adminAuthLoading, setAdminAuthLoading] = useState(false);
  const url = "http://localhost:3000/auth";

  const adminLogin = (formData) => {
    setAdminAuthLoading(true);
    return fetch(`${url}/admin-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .finally(() => {
        setAdminAuthLoading(false);
      });
  };

  return { adminLogin, adminAuthLoading };
}