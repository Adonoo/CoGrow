import { useState, useEffect } from "react";
import p1 from "../../assets/stages/pflanze1.svg";
import p2 from "../../assets/stages/pflanze2.svg";
import p3 from "../../assets/stages/pflanze3.svg";
import p4 from "../../assets/stages/pflanze4.svg";
import p5 from "../../assets/stages/pflanze5.svg";
import p6 from "../../assets/stages/pflanze6.svg";
import "./Plant.css";
const plantStages = [p1, p2, p3, p4, p5, p6];

export function Plant() {

  const [level, setLevel] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLevel((prevLevel) => {
        if (prevLevel < plantStages.length - 1) {
          return prevLevel + 1;
        }
        return prevLevel;
      });
    }, 1500); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="plant-container">

      {plantStages.map((stage, index) => (
        <img
          key={index}
          src={stage}
          className="plant-img"
          style={{
            opacity: index === level ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
}
