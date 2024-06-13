import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { useGridApiContext } from "@mui/x-data-grid";

const StatusEditCell = (props) => {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event) => {
    const newValue = event.target.value;
    await apiRef.current.setEditCellValue(
      { id, field, value: newValue },
      event
    );
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <Select
      autoFocus
      value={value}
      onChange={handleChange}
      size="small"
      sx={{ width: "100%" }}
    >
      <MenuItem value="pending">pending</MenuItem>
      <MenuItem value="progress">progress</MenuItem>
      <MenuItem value="completed">completed</MenuItem>
    </Select>
  );
};

export default StatusEditCell;
