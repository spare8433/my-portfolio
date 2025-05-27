import { type ChangeEvent, useState } from "react";

type UseInputReturn = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setValue: (v: string) => void;
  reset: () => void;
};

export function useInput(initialValue: string = ""): UseInputReturn {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const reset = () => setValue(initialValue);

  return { value, onChange, setValue, reset };
}
