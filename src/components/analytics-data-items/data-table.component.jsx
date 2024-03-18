import "./data-item.styles.css";

const AnalyticsTable = ({ onClickRow, activeRow }) => {
  console.log(activeRow);

  return (
    <div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Admin</th>
            <th>Level</th>
            <th>Approved</th>
            <th>Defferred</th>
            <th>Rejected</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dom</td>
            <td>ADMIN I</td>
            <td>14 / 32</td>
            <td>4 / 23</td>
            <td>1 / 8</td>
          </tr>
          <tr>
            <td>Melissa</td>
            <td>ADMIN II</td>
            <td>14 / 32</td>
            <td>4 / 23</td>
            <td>1 / 8</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AnalyticsTable;
