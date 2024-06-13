import { useState } from "react";

import { GridRowModes, GridActionsCellItem } from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

import ModalDelete from "./ModalDelete";

const ActionsCell = (props) => {
  const [open, setOpen] = useState(false);

  const { id, rowModesModel, setRowModesModel } = props;
  const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (isInEditMode) {
    return [
      <GridActionsCellItem
        key="save"
        icon={<SaveIcon />}
        label="Save"
        sx={{
          color: "primary.main",
        }}
        onClick={handleSaveClick(id)}
      />,
      <GridActionsCellItem
        key="cancel"
        icon={<CancelIcon />}
        label="Cancel"
        className="textPrimary"
        onClick={handleCancelClick(id)}
        color="inherit"
      />,
    ];
  }

  return [
    <GridActionsCellItem
      key="edit"
      icon={<EditIcon />}
      label="Edit"
      className="textPrimary"
      onClick={handleEditClick(id)}
      color="inherit"
    />,
    <GridActionsCellItem
      key="delete"
      icon={<DeleteIcon />}
      label="Delete"
      onClick={handleOpen}
      color="inherit"
    />,
    open && <ModalDelete {...props} open={open} handleClose={handleClose} />,
  ];
};

export default ActionsCell;
