import * as z from 'zod';
import { UseFormProps, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"

export function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
    schema: TSchema;
  }
) {
  const form = useForm<TSchema["_input"]>({
    ...props,
    resolver: zodResolver(props.schema, undefined, {
      // This makes it so we can use `.transform()`s on the schema without same transform getting applied again when it reaches the server
      raw: true
    })
  });

  return form;
}