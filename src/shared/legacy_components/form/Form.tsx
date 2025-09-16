import {FormProvider, useForm} from 'react-hook-form';

interface FormProps {
  children: React.ReactNode;
  defaultValues: any;
}

export const Form = ({children, defaultValues}: FormProps) => {
  const methods = useForm({defaultValues});

  return <FormProvider {...methods}>{children}</FormProvider>;
};
