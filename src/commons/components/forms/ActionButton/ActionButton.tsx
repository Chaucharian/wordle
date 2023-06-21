import * as React from "react";
import { ButtonProps, Button } from "@chakra-ui/react";

export interface IActionButtonProps extends ButtonProps {}

export const ActionButton: React.FC<IActionButtonProps> = ({
  children,
  ...rest
}) => {
  return (
    <Button
      width="264px"
      height="50px"
      bgColor="green.300"
      color="white"
      fontWeight="extrabold"
      fontSize="28px"
      {...rest}
    >
      {children}
    </Button>
  );
};
