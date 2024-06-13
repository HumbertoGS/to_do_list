import { useEffect, useContext } from "react";

import Alert from "@mui/material/Alert";

import { AlertContext } from "../../context/AlertContext";

import "../../assets/styles/alert.css";

//------ tipo mensaje ------
// 'info',  //Para informacion
// 'success',  //Para todo nice
// 'danger',   //Para error
// 'warning',  //Para advertencias

const MensajeAlert = () => {
  const {
    mensajeAlert: { variant, mensaje, mostrar },
    setMensajeAlert,
  } = useContext(AlertContext);

  useEffect(() => {
    if (mostrar) {
      const interval = setTimeout(() => {
        setMensajeAlert({ mostrar: false, mensaje: "", variant: "" });
      }, 4200);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line
  }, [mostrar]);

  return (
    <>
      {mostrar && (
        <div className="Mensaje">
          <Alert
            show={mostrar}
            severity={variant}
            className="Alert d-flex justify-content-start align-items-center fw-bold border-0"
          >
            <p className="my-0">
              <i>{mensaje}</i>
            </p>
          </Alert>
        </div>
      )}
    </>
  );
};

export default MensajeAlert;
