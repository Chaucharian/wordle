import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    useSystemColorMode: true,
  },
  colors: {
    green: {
      "50": "#F0F5EF",
      "100": "#D4E4D2",
      "200": "#B8D3B6",
      "300": "#9DC299",
      "400": "#81B17C",
      "500": "#65A05F",
      "600": "#51804C",
      "700": "#3D6039",
      "800": "#294026",
      "900": "#142013",
    },
    yellow: {
      "50": "#FBF7EA",
      "100": "#F2EAC4",
      "200": "#EADC9E",
      "300": "#E2CF79",
      "400": "#DAC153",
      "500": "#D2B42D",
      "600": "#A89024",
      "700": "#7E6C1B",
      "800": "#544812",
      "900": "#2A2409",
    },
    gray: {
      "50": "#F2F2F2",
      "100": "#DBDBDB",
      "200": "#C4C4C4",
      "300": "#ADADAD",
      "400": "#969696",
      "500": "#808080",
      "600": "#666666",
      "700": "#3B435E",
      "800": "#282D3E",
      "900": "#14161F",
    },
  },
});
