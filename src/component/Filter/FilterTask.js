import { useContext, useState } from "react";

import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { AlertContext } from "../../context/AlertContext";

const columnH = ["id", "order", "title", "status"];

const FilterTask = ({ rows, setRows }) => {
  const [column, setColumn] = useState("column");
  const [order, setOrder] = useState("order");

  const { setMensajeAlert } = useContext(AlertContext);

  const sortData = () => {
    const rowsCopy = [...rows];

    const sortedData = rowsCopy.sort((a, b) => {
      if (a[column] < b[column]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });

    setMensajeAlert({
      mostrar: true,
      mensaje: `Rows sorted by ${column} ${order}`,
      variant: "success",
    });

    setRows(sortedData);
  };

  const handleChangeColumn = ({ target }) => setColumn(target.value);
  const handleChangeOrder = ({ target }) => setOrder(target.value);

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
          alignItems="center"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={1}
        >
          <p>Column: </p>
          <Select
            size="small"
            value={column}
            onChange={handleChangeColumn}
            sx={{ width: "100%" }}
          >
            <MenuItem value="column" disabled>
              Select column
            </MenuItem>
            {columnH.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <p>Order: </p>
          <Select
            size="small"
            value={order}
            onChange={handleChangeOrder}
            sx={{ width: "100%" }}
          >
            <MenuItem value="order" disabled>
              Select order
            </MenuItem>
            <MenuItem value="asc">asc</MenuItem>
            <MenuItem value="desc">desc</MenuItem>
          </Select>
          <Button
            variant="contained"
            size="small"
            onClick={sortData}
            disabled={column === "column" || order === "order"}
            endIcon={<FilterAltIcon />}
            sx={{ width: "200px", px: 3 }}
          >
            Filter
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default FilterTask;
