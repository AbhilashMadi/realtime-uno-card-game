import { useState, ChangeEvent, FormEvent } from "react";

type Validator<T> = (values: T) => Partial<Record<keyof T, string>>;

interface UseFormProps<T> {
  initialValues: T;
  validate?: Validator<T>;
  onSubmit: (values: T) => void;
}

export function useForm<T>({
  initialValues,
  validate,
  onSubmit,
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    const val = type === "checkbox" ? checked : value;

    setValues((prev) => ({
      ...prev,
      [name]: type === "number" ? +val : val,
    }));
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate ? validate(values) : {};

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  };

  const setFieldValue = (name: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return {
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
