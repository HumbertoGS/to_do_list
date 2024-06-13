import { createContext, useState } from "react";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [mensajeAlert, setMensajeAlert] = useState({
    mostrar: false,
    mensaje: "",
    variant: "",
  });

  return (
    <AlertContext.Provider
      value={{ mensajeAlert, setMensajeAlert: (x) => setMensajeAlert(x) }}
    >
      {children}
    </AlertContext.Provider>
  );
};
