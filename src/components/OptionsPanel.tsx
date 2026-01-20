export default function OptionsPanel() {
  const bfs = () => {
  };
  return (
    <div>
      <span>Select:</span>
      <select className="bg-gray-200">
        <option value="">--Select Algorithm--</option>
      </select>

      <button onClick={bfs}>Start dfs</button>
    </div>
  );
}
