import { useState } from "react";

export default function TrafficLight() {
  const [light, setLight] = useState("red");

  const message =
    light === "red" ? "STOP" :
    light === "yellow" ? "WAIT" :
    "GO";

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <h2>Traffic Light Controller</h2>

      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setLight("red")}>Red</button>{" "}
        <button onClick={() => setLight("yellow")}>Yellow</button>{" "}
        <button onClick={() => setLight("green")}>Green</button>
      </div>

      <p>Current light: <b>{light}</b></p>
      <p>Driver instruction: <b>{message}</b></p>
    </div>
  );
}
