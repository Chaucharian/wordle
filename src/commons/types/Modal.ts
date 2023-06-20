import React, { ReactNode } from "react";

export interface IModalPayload<T = any> {
  title?: string;
  description?: string;
  body?: ReactNode | ReactNode[];
  metadata?: T;
  onSubmit?: () => void;
}

export interface IModalProps<T = any> {
  payload: IModalPayload<T>;
}

export interface IModalItem {
  name: string;
  component: React.FC<IModalProps>;
}
