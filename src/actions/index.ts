import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { phone } from "phone";

export const server = {
  setGeneral: defineAction({
    accept: "form",
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      phoneNumber: z.string().refine((val) => phone(val).isValid),
    }),
    handler: async ({ name, email, phoneNumber }) => {
      return { name, email, phoneNumber };
    },
  }),
  setEducation: defineAction({
    accept: "form",
    // input: z.object({
    //   name: z.string(),
    //   email: z.string().email(),
    //   phoneNumber: z.string().refine((val) => phone(val).isValid),
    // }),
    handler: async (input) => {
      console.log(input);
    },
  }),
};
