export interface HTMLElement {
  name: string;
  needClosing?: boolean;
  children?: HTMLElement[] | string;
  attributes?: Attribute[];
}

export interface Attribute {
  name: string;
  value: string;
}
