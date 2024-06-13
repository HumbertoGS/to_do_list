import { useContext, useState } from "react";

import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";

import { AlertContext } from "../../context/AlertContext";

const SearchTask = ({ setRows, setReload }) => {
  const [id, setID] = useState("");

  const { setMensajeAlert } = useContext(AlertContext);

  const sendTask = () => {
    fetch(`${process.env.REACT_APP_API}/tasks/${id}`)
      .then((resp) => resp.json())
      .then(({ data, message, status }) => {
        setMensajeAlert({
          mostrar: true,
          mensaje: message,
          variant: status === 200 ? (data ? "success" : "info") : "error",
        });

        if (data) setRows([data]);
        else setRows([]);
      })
      .catch((error) => console.error("Error method GET:", error));
  };

  const handleChange = (event) => {
    const value = event.target.value;
    if (/^[1-9]\d*$/.test(value) || value === "") {
        setID(value);
    }
  };

  const clear = () => {
    setID("");
    setReload();
  };

  return (
    <Card sx={{ width: 670, mb: 2 }}>
      <Stack
        direction="column"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        sx={{ px: 4, py: 2 }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <>
            <p>ID: </p>
            <TextField
              id="search_id"
              onChange={handleChange}
              value={id}
              variant="standard"
              sx={{ width: "50px" }}
              inputProps={{ maxLength: 2 }}
            />
          </>

          <p style={{ width: "80%" }}> </p>

          <Button
            variant="contained"
            size="small"
            onClick={clear}
            disabled={id === ""}
            endIcon={<SearchOffIcon />}
            sx={{ width: "200px", px: 3 }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={sendTask}
            disabled={id === ""}
            endIcon={<SearchIcon />}
            sx={{ width: "200px", px: 3 }}
          >
            Search
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default SearchTask;
