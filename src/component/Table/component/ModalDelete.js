import { useContext } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import DeleteIcon from "@mui/icons-material/Delete";
import Cancel from "@mui/icons-material/Cancel";

import { AlertContext } from "../../../context/AlertContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const ModalDelete = ({ id, open, setReload, handleClose }) => {
  const { setMensajeAlert } = useContext(AlertContext);

  const handleDeleteClick = (id) => () => {
    fetch(`${process.env.REACT_APP_API}/tasks/${id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then(({ data, message, status }) => {
        setMensajeAlert({
          mostrar: true,
          mensaje: message,
          variant: status === 200 ? (data ? "success" : "info") : "error",
        });

        setReload();
        handleClose();
      })
      .catch((error) => console.error("Error method DELETE:", error));
  };

  return (
    <>
      <Modal open={open}>
        <Box sx={style}>
          <Typography align="center" variant="h6" component="h4">
            Are you sure to delete the task with id {id}?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              pt: 3,
            }}
          >
            <Button
              variant="outlined"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteClick(id)}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              size="small"
              endIcon={<Cancel />}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalDelete;
