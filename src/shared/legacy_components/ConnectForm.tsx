import {useFormContext} from 'react-hook-form';

export const ConnectForm = <T extends Record<string, any>>({
  children,
}: {
  children: (
    methods: ReturnType<typeof useFormContext<T>>,
  ) => React.ReactElement;
}) => {
  const methods = useFormContext<T>();

  return children({...methods});
};
