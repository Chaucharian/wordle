import { IModalItem } from "commons/types/Modal";
import { InstructionsModal } from "./Instructions";
import { StatsModal } from "./Stats";

export enum ModalTypes {
  "INSTRUCTIONS" = "INSTRUCTIONS",
  "STATS" = "STATS",
}

export const registeredModals: IModalItem[] = [
  { name: ModalTypes.INSTRUCTIONS, component: InstructionsModal },
  { name: ModalTypes.STATS, component: StatsModal },
];
