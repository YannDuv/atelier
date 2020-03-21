export type Validator = {
  isValid: (value?: string | number) => boolean;
  message: string;
};
