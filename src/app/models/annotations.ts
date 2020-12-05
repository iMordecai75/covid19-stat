export interface Label {
  enabled: boolean;
  fontColor: string;
  content: string;
}

export interface Annotations {
  type: string;
  mode: string;
  scaleID: string;
  value: string;
  borderColor: string;
  borderWidth: number;
  label: Label;
}
