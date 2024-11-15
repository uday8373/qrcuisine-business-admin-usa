import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import {XMarkIcon} from "@heroicons/react/24/solid";

export default function UpdateTemperature({
  open,
  handleOpen,
  handleSubmit,
  formData,
  setFormData,
  loading,
  errors,
}) {
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value === "true",
    });
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader className="relative m-0 block">
        <Typography variant="h4" color="blue-gray">
          Update Temperature
        </Typography>
        <Typography className="mt-1 font-normal text-gray-600">
          Update the temperature settings for your store.
        </Typography>
        <IconButton
          size="sm"
          variant="text"
          className="!absolute right-3.5 top-3.5"
          onClick={handleOpen}>
          <XMarkIcon className="h-4 w-4 stroke-2" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="h-[20rem] overflow-y-scroll">
        <div className="space-y-4">
          {/* Title Field */}
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium">
              Title
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="eg. South Indian"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`placeholder:opacity-100 focus:!border-t-gray-900 !border-t-gray-400 ${
                errors.title ? "border-red-500" : ""
              }`}
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
            {errors.title && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.title}
              </Typography>
            )}
          </div>

          {/* Select for Availability */}
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium">
              Available
            </Typography>
            <Select
              className={`!w-full !border-[1.5px] !border-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent focus:!border-primary ${
                errors.is_available ? "border-red-500" : ""
              }`}
              placeholder="Select availability"
              value={String(formData.is_available)}
              size="lg"
              onChange={(value) => handleSelectChange("is_available", value)}
              labelProps={{className: "hidden"}}>
              <Option value="true">Yes</Option>
              <Option value="false">No</Option>
            </Select>
            {errors.is_available && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.is_available}
              </Typography>
            )}
          </div>

          {/* Price Field */}
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium">
              Price
            </Typography>
            <Input
              color="gray"
              size="lg"
              type="number"
              placeholder="eg. 100"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`placeholder:opacity-100 focus:!border-t-gray-900 !border-t-gray-400 ${
                errors.price ? "border-red-500" : ""
              }`}
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
            {errors.price && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.price}
              </Typography>
            )}
          </div>

          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium">
              Value
            </Typography>
            <Input
              color="gray"
              size="lg"
              type="number"
              placeholder="eg. 100"
              name="value"
              value={formData?.value}
              onChange={handleChange}
              className={`placeholder:opacity-100 focus:!border-t-gray-900 !border-t-gray-400 ${
                errors.value ? "border-red-500" : ""
              }`}
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
            {errors.value && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.value}
              </Typography>
            )}
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          loading={loading}
          onClick={() => handleSubmit(formData)}
          disabled={!errors || loading}
          className="ml-auto">
          Update Temperature
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
