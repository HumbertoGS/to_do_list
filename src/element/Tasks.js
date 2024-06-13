import { useEffect, useState } from "react";

import AddTask from "../component/Add/AddTask";
import TableCustom from "../component/Table/TableCustom";
import SearchTask from "../component/Search/SearchTask";
import FilterTask from "../component/Filter/FilterTask";

const Tasks = () => {
  const [rows, setRows] = useState([]);
  const [reload, setReload] = useState(false);

  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/tasks/`)
      .then((resp) => resp.json())
      .then(({ data }) => setRows(data))
      .catch((error) => console.error("Error:", error));
  }, [reload]);

  const reloadFetch = () => setReload((prevValue) => !prevValue);
  const showOption = () => setShowOptions((prevValue) => !prevValue);
  const handleChangeRows = (_rows) => setRows(_rows);

  return (
    <div className="Container">
      <AddTask
        num={rows.length}
        setReload={reloadFetch}
        showOptions={showOption}
      />
      {showOptions && (
        <>
          <SearchTask setRows={handleChangeRows} setReload={reloadFetch} />
          <FilterTask rows={rows} setRows={handleChangeRows} />
        </>
      )}
      <TableCustom rows={rows} setReload={reloadFetch} />;
    </div>
  );
};

export default Tasks;
