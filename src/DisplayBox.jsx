import { useEffect, useState } from "react";

export default function App({
  displayBoxStyle,
  itemsToFind,
  setClickPosition,
  setSelectedItem,
}) {
  const [selectedValue, setSelectedValue] = useState("");

  function handleSelection(e) {
    const value = e.target.value;
    setSelectedValue(value);
    setSelectedItem(value);
  }

  useEffect(() => {
    setSelectedValue("");
  }, [displayBoxStyle]);

  return (
    <div id="displayBox" style={displayBoxStyle}>
      <select
        name="character"
        id="characterSelect"
        value={selectedValue}
        onChange={(e) => {
          handleSelection(e);
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
