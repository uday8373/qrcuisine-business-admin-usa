import React, {useState} from "react";
import {
  Input,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Switch,
  Select,
  Option,
} from "@material-tailwind/react";
import {XMarkIcon} from "@heroicons/react/24/outline";

export default function AddSubCategoryModal({
  open,
  formData,
  setFormData,
  handleSubmit,
  handleOpen,
  loading,
  parentCategorys,
  errors,
}) {
  const handleTitleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStatusToggle = () => {
    setFormData({
      ...formData,
      status: !formData.status,
    });
  };

  return (
    <>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Add Sub Food Category
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}>
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium">
              Name
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="e.g., South Indian"
              name="title"
              value={formData.title}
              onChange={handleTitleChange}
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
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium">
              Status
            </Typography>
            <Switch
              label="Available"
              checked={formData.status}
              onChange={handleStatusToggle}
              className={errors.status ? "border-red-500" : ""}
            />
            {errors.status && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.status}
              </Typography>
            )}
          </div>

          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium">
              Parent Categorys
            </Typography>
            <Select
              className={`!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t group-hover:!border-primary ${
                errors.category_id ? "border-red-500" : ""
              }`}
              placeholder="Select a category"
              label="Select a category"
              value={formData?.category_id}
              size="lg"
              onChange={(value) => setFormData({...formData, category_id: value})}
              labelProps={{
                className: "hidden",
              }}>
              {parentCategorys?.map((category) => (
                <Option key={category?.id} value={category?.id}>
                  {category?.category_name}
                </Option>
              ))}
            </Select>
            {errors.category_id && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.category_id}
              </Typography>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            loading={loading}
            onClick={handleSubmit}
            disabled={!errors || loading}
            className="ml-auto">
            Add Category
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
