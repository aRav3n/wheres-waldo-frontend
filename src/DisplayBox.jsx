export default function App({
  displayBoxStyle,
  itemsToFind,
  setClickPosition,
  setSelectedItem,
}) {
  return (
    <div id="displayBox" style={displayBoxStyle}>
      <select
        name="character"
        id="characterSelect"
        onChange={(e) => {
          setSelectedItem(e.target.value);
        }}
      >
        <option value="">--Who is this?--</option>
        {itemsToFind.map((item) => {
          const name = item.name;
          const id = item.id;
          const found = item.found;
          if (!found) {
            return (
              <option value={id} key={id}>
                {name}
              </option>
            );
          }
          return;
        })}
      </select>
    </div>
  );
}
