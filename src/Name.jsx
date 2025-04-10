import { useState } from "react";

export default function App({ setName }) {
  const [tempName, setTempName] = useState("");

  return (
    <>
      <form id="nameForm" action="">
        <label htmlFor="name">
          What is your name?
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => {
              setTempName(e.target.value);
            }}
            value={tempName}
          />
        </label>
        <button
          type="button"
          onClick={() => {
            setName(tempName);
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
}
