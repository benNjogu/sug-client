import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const CellItem = ({ group_id, label, onClick, onRemove }) => {
  let chipData = useSelector(
    (state) => state.cell?.newGroups[group_id]?.nominees
  );

  let { capacity } = useSelector((state) => state.cell.capacity);

  return (
    <div className="group-div">
      <p className="div-counter">
        {label}:{" "}
        <span
          className={
            chipData?.length < capacity?.minCapacity ? "text-danger" : ""
          }
        >
          {chipData?.length}
        </span>
        /{capacity?.maxCapacity}
      </p>
      <Paper
        sx={{
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
          p: 0.5,
          m: 0,
        }}
        component="ul"
      >
        {chipData?.map((data) => {
          return (
            <ListItem key={data.nominee_id}>
              <Chip
                label={data.first_name}
                onClick={() => onClick(data.first_name)}
                onDelete={() => onRemove(data.nominee_id, data.group_id)}
              />
            </ListItem>
          );
        })}
      </Paper>
      {capacity?.minCapacity > chipData?.length && (
        <p className="text-danger">
          {`A minimum of ${capacity.minCapacity} ${
            capacity.minCapacity > 1 ? `nominees` : `nominee`
          } required`}
        </p>
      )}
    </div>
  );
};

export default CellItem;
