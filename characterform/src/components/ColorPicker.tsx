import React, { ChangeEvent } from "react";

type ColorPickerProps = {
  label: string;
  selectedColor: string;
  onChange: (color: string) => void;
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  selectedColor,
  onChange,
}) => {
  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <label htmlFor="colorPicker">{label}</label>
      <input
        type="color"
        id="colorPicker"
        value={selectedColor}
        onChange={handleColorChange}
      />
    </div>
  );
};
