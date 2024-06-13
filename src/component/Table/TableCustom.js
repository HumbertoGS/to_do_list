import { useState, useContext } from "react";

import Card from "@mui/material/Card";

import { DataGrid, GridRowEditStopReasons } from "@mui/x-data-grid";

import StatusEditCell from "./component/StatusEditCell";
import ActionsCell from "./component/ActionsCell";

import { AlertContext } from "../../context/AlertContext";

const TableCustom = ({ rows, setReload }) => {
  const [rowModesModel, setRowModesModel] = useState({});

  const { setMensajeAlert } = useContext(AlertContext);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow) => {
    fetch(`${process.env.REACT_APP_API}/tasks/${newRow.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRow),
    })
      .then((resp) => resp.json())
      .then(({ data, message, status }) => {
        setMensajeAlert({
          mostrar: true,
          mensaje: message,
          variant: status === 200 ? (data ? "success" : "info") : "error",
        });
      })
      .catch((error) => console.error("Error method PUT:", error));

    return newRow;
  };

  const handleRowModesModelChange = (newRowModesModel) =>
    setRowModesModel(newRowModesModel);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "order",
      headerName: "Order",
      type: "number",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    { field: "title", headerName: "Title", headerAlign: "center", width: 220 },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      width: 150,
      editable: true,
      renderEditCell: (params) => <StatusEditCell {...params} />,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      headerAlign: "center",
      width: 130,
      cellClassName: "actions",
      renderCell: (params) => (
        <ActionsCell
          key={params.id}
          id={params.id}
          setReload={setReload}
          rowModesModel={rowModesModel}
          setRowModesModel={(x) => setRowModesModel(x)}
        />
      ),
    },
  ];

  return (
    <Card
      sx={{
        height: 400,
        width: 670,
        background: "#ffffff",
        borderRadius: "5px",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        autoPageSize
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableSelectionOnClick
        disableColumnSorting
      />
    </Card>
  );
};

export default TableCustom;
