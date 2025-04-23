// actions.ts
"use server";

import { formSchema } from "./schema";

export function onSubmitStudent(
  _prevState: { message: string },
  formData: FormData
) {
  const parse = formSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  if (!parse.success) {
    const fieldErrors = parse.error.flatten().fieldErrors;
    return {
      errors: fieldErrors,
      message: undefined,
    };
  }

  const data = parse.data;
  console.log("Validated Data:", data);
  return {
    message: "Form submitted successfully!",
    errors: undefined,
  };
}
