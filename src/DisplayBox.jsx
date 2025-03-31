function DisplayCorrect() {
  return <div></div>
}

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
          return (
            <option value={id} key={id}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
