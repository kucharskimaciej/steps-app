import { Component } from "vue";

export enum MODAL_STYLE {
  DRAWER = "DRAWER",
  OVERLAY = "OVERLAY",
  BORDERLESS = "BORDERLESS"
}

export type ModalRef = {
  uuid: string;
  component: Component;
  options: ModalOptions;
};

export type ModalOptions = {
  style: MODAL_STYLE;
  props?: unknown;
};

export type ModalDefinition = {
  component: Component;
  options: ModalOptions;
};

export type ModalDefinitionProvider = (...params: any[]) => ModalDefinition;

export enum MODALS {
  SESSION_CART = "SESSION_CART",
  SINGLE_VIDEO = "SINGLE_VIDEO"
}
