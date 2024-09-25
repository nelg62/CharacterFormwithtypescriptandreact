import { useState } from "react";
import { Dropdown } from "./Dropdown";

type BorderStyle = "solid" | "dashed" | "dotted" | "double";

const borderOptions = [
  { value: "solid", label: "Solid" },
  { value: "dashed", label: "Dashed" },
  { value: "dotted", label: "Dotted" },
  { value: "double", label: "Double" },
];

export default function TestEditStyles() {
  const [borderStyle, setBorderStyle] = useState<BorderStyle>("solid");

  console.log("borderstyle", borderStyle);

  return (
    <>
      <Dropdown<BorderStyle>
        label="Choose a border style:"
        options={borderOptions}
        selectedOption={borderStyle}
        onChange={setBorderStyle}
      />

      <div className={`border-${borderStyle} border-2`}>
        <div>
          <h1>testing</h1>
        </div>
      </div>
    </>
  );
}
