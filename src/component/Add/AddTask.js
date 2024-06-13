import { useState, useContext } from "react";

import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";

import DragHandleIcon from "@mui/icons-material/DragHandle";

import { AlertContext } from "../../context/AlertContext";

const AddTask = ({ num, setReload, showOptions }) => {
  const [title, setTitle] = useState("");

  const { setMensajeAlert } = useContext(AlertContext);

  const sendTask = () => {
    const data = {
      title,
      status: "pending",
      order: num + 1,
    };

    fetch(`${process.env.REACT_APP_API}/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then(({ data, message, status }) => {
        setMensajeAlert({
          mostrar: true,
          mensaje: message,
          variant: status === 200 ? (data ? "success" : "info") : "error",
        });
        setTitle("");
        setReload();
      })
      .catch((error) => console.error("Error method POST:", error));
  };

  const handleChange = ({ target }) => setTitle(target.value);

  return (
    <Card sx={{ width: 670, my: 2 }}>
      <Stack direction="column" spacing={2} sx={{ px: 4, py: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <p> </p>
          <p>TO DO LIST </p>
          <IconButton aria-label="DragHandle" onClick={showOptions}>
            <DragHandleIcon />
          </IconButton>
        </Stack>

        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <p>Title: </p>
          <TextField
            id="standard-basic"
            onChange={handleChange}
            value={title}
            variant="standard"
            sx={{ width: "100%" }}
            inputProps={{ maxLength: 75 }}
          />
          <Button
            sx={{ width: "170px" }}
            variant="contained"
            onClick={sendTask}
            disabled={title === ""}
          >
            New Task
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default AddTask;
