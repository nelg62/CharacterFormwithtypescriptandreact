import { useState } from "react";
import { Dropdown } from "./Dropdown";
import { ColorPicker } from "./ColorPicker";

type BorderStyle = "solid" | "dashed" | "dotted" | "double";

const borderOptions: { value: BorderStyle; label: string }[] = [
  { value: "solid", label: "Solid" },
  { value: "dashed", label: "Dashed" },
  { value: "dotted", label: "Dotted" },
  { value: "double", label: "Double" },
];

export default function TestEditStyles() {
  const [borderStyle, setBorderStyle] = useState<BorderStyle>("solid");
  const [backgroundColor, setBackgroundColor] = useState<string>("#1da1f2");

  console.log("borderstyle", borderStyle);
  console.log("backgroundcolor", backgroundColor);

  return (
    <>
      <Dropdown<BorderStyle>
        label="Choose a border style:"
        options={borderOptions}
        selectedOption={borderStyle}
        onChange={setBorderStyle}
      />

      <ColorPicker
        label=":Choose background color:"
        selectedColor={backgroundColor}
        onChange={setBackgroundColor}
      />

      <div
        className={`border-${borderStyle}  border-2`}
        style={{ backgroundColor }}
      >
        <div>
          <h1>testing</h1>
        </div>
      </div>
    </>
  );
}
