import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import {XMarkIcon} from "@heroicons/react/24/solid";
import {WEB_CONFIG} from "@/configs/website-config";

export default function UpdateGroup({
  open,
  handleOpen,
  handleSubmit,
  formData,
  setFormData,
  loading,
  errors,
  allGroup,
}) {
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader className="relative m-0 block">
        <Typography variant="h4" color="blue-gray">
          Update Group
        </Typography>
        <Typography className="mt-1 font-normal text-gray-600">
          Update the group details.
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
              placeholder="Group Title"
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
          {/* key_value Field */}
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium">
              Key Value
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Group keywords"
              name="key_value"
              value={formData.key_value}
              onChange={handleChange}
              className={`placeholder:opacity-100 focus:!border-t-gray-900 !border-t-gray-400 ${
                errors.key_value ? "border-red-500" : ""
              }`}
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
            {errors.key_value && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.key_value}
              </Typography>
            )}
          </div>
          {/* type Field */}
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium">
              Type
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Group type "
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`placeholder:opacity-100 focus:!border-t-gray-900 !border-t-gray-400 ${
                errors.type ? "border-red-500" : ""
              }`}
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
            {errors.type && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.type}
              </Typography>
            )}
          </div>
          {/* group_category Field */}
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium">
              Category Group
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder=" Category Group Name"
              name="group_category"
              value={formData.group_category}
              onChange={handleChange}
              className={`placeholder:opacity-100 focus:!border-t-gray-900 !border-t-gray-400 ${
                errors.type ? "border-red-500" : ""
              }`}
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
            {errors.group_category && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.group_category}
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
          Add Side
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
