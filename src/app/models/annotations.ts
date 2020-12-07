export interface Label {
  enabled: boolean;
  fontColor: string;
  content: string;
}

export interface Annotations {
  id: number;
  type: string;
  mode: string;
  scaleID: string;
  value: string;
  borderColor: string;
  borderWidth: number;
  label: Label;
}
