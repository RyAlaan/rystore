export type formType = {
  className?: string;
  type: string;
  name: string;
  required? : boolean;
  label: string;
  pattern? : string;
  disabled? :boolean;
  value? : string | number | undefined;
  onChange? : (e : any) => void;
  min?: number;
  max?: number;
  title?: string;
};
