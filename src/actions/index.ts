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
    input: z.object({
      schoolName: z.string(),
      titleOfStudy: z.string(),
      graduationDate: z.string().date(),
    }),
    handler: async ({ schoolName, titleOfStudy, graduationDate }) => {
      return { schoolName, titleOfStudy, graduationDate };
    },
  }),
  setWork: defineAction({
    accept: "form",
    input: z
      .object({
        companyName: z.string(),
        titleOfPosition: z.string(),
        responsibilitiesOfPosition: z.string(),
        startDate: z.string().pipe(z.coerce.date()),
        endDate: z.string().pipe(z.coerce.date()),
      })
      .refine((data) => data.endDate.getTime() < data.startDate.getTime()),
    handler: async (input) => {
      return input;
    },
  }),
};
