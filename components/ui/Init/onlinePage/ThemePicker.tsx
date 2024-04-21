/* "use client";
import React, { useMemo, useState } from "react";
import { Button, ColorPicker, theme } from "antd";
import type { Color } from "antd/es/color-picker";

const ThemePicker: React.FC = () => {
  const { token } = theme.useToken();
  const [color, setColor] = useState<Color | string>(token.colorPrimary);

  const bgColor = useMemo<string>(
    () => (typeof color === "string" ? color : color.toHexString()),
    [color]
  );

  const btnStyle: React.CSSProperties = {
    backgroundColor: bgColor,
  };

  return <ColorPicker size="large" showText />;
};

export default ThemePicker;
 */
export {};
