import * as Yup from "yup";

export const validationGroupSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")

    .test("no-empty-space", "Title cannot contain only spaces", (value) => {
      return value && value.trim().length > 0;
    }),
  key_value: Yup.string()
    .required("key_value is required")

    .test("no-empty-space", "key_value cannot contain only spaces", (value) => {
      return value && value.trim().length > 0;
    }),
  type: Yup.string()
    .required("type is required")

    .test("no-empty-space", "type cannot contain only spaces", (value) => {
      return value && value.trim().length > 0;
    }),
  group_category: Yup.string()
    .required("group_category is required")

    .test("no-empty-space", "group_category cannot contain only spaces", (value) => {
      return value && value.trim().length > 0;
    }),
});

export const validationSideSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")

    .test("no-empty-space", "Title cannot contain only spaces", (value) => {
      return value && value.trim().length > 0;
    }),
  price: Yup.string().required("Price is required"),
  group_id: Yup.string().required("Group_id is required"),

  quantity: Yup.string().required("Quantity is required"),
});
export const validationSideUpdateSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")

    .test("no-empty-space", "Title cannot contain only spaces", (value) => {
      return value && value.trim().length > 0;
    }),
  price: Yup.string().required("Price is required"),

  quantity: Yup.string().required("Quantity is required"),
});

export const validateQuantity = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")

    .test("no-empty-space", "Title cannot contain only spaces", (value) => {
      return value && value.trim().length > 0;
    }),

  group_id: Yup.string()
    .required("Group_id is required")
    .test("no-empty-space", "Group_id is required", (value) => {
      return value && value.trim().length > 0;
    }),
});
export const validateQuantityUpdate = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")

    .test("no-empty-space", "Title cannot contain only spaces", (value) => {
      return value && value.trim().length > 0;
    }),
});
export const validationTemperatureUpdateSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  value: Yup.number()
    .required("Value is required")
    .min(1, "Value must be at least 1")
    .max(100, "Value cannot be more than 100"),
});
