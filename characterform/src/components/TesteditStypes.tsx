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
  const [borderColor, setBorderColor] = useState<string>("red");

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
      <ColorPicker
        label=":Choose border color"
        selectedColor={borderColor}
        onChange={setBorderColor}
      />

      <div
        className="border-2"
        style={{ borderStyle, backgroundColor, borderColor }}
      >
        <div>
          <h1>testing</h1>
        </div>
      </div>
    </>
  );
}
