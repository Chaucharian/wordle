import * as React from "react";
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
  Switch,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  // const text = useColorModeValue("dark", "light")
  const value = useColorModeValue("dark", "light");
  // const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return <Switch onChange={toggleColorMode} value={value} />;
};
