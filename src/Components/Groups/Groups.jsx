import React from "react";
import { useState } from "react";
import "./Groups.css";

function Groups() {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(code);
  };
  return (
    <div>
      <form action="post">
        <input
          type="text"
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />
        <button onClick={handleSubmit}>Join</button>
      </form>
    </div>
  );
}

export default Groups;
