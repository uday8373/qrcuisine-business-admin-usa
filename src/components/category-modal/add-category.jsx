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
  Card,
  CardBody,
} from "@material-tailwind/react";
import {XMarkIcon} from "@heroicons/react/24/outline";

const emojiIcons = [
  "🍎",
  "🍌",
  "🍇",
  "🍒",
  "🍉",
  "🍑",
  "🍍",
  "🥭",
  "🍋",
  "🍊",
  "🍏",
  "🥝",
  "🍐",
  "🍓",
  "🫐",
  "🍅",
  "🥥",
  "🥒",
  "🥕",
  "🌽",
  "🥔",
  "🍠",
  "🧄",
  "🧅",
  "🍄",
  "🥬",
  "🥦",
  "🌶",
  "🥑",
  "🍞",
  "🥖",
  "🥨",
  "🥯",
  "🧇",
  "🧈",
  "🥐",
  "🍗",
  "🍖",
  "🍔",
  "🌭",
  "🍕",
  "🥪",
  "🌮",
  "🌯",
  "🥙",
  "🍜",
  "🍝",
  "🍣",
  "🍤",
  "🍱",
  "🥟",
  "🍚",
  "🍲",
  "🥘",
  "🥫",
  "🥩",
  "🍳",
  "🧂",
  "🍿",
  "🍫",
  "🍩",
  "🍪",
  "🍰",
  "🍮",
  "🍦",
  "🍨",
  "🍧",
  "🍬",
  "🍭",
  "🍯",
  "🥛",
  "🍵",
  "🧋",
  "🍶",
  "🍾",
  "🍹",
  "🍸",
  "🍺",
  "🍻",
];

export function AddCategoryModal({
  open,
  formData,
  setFormData,
  handleSubmit,
  handleOpen,
  loading,
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

  const handleIconSelect = (icon) => {
    setFormData({
      ...formData,
      icon,
    });
  };

  return (
    <>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Add Food Category
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
          <div className="w-full h-full relative">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium">
              Category Icon
            </Typography>
            <Card className=" overflow-y-auto h-56 border border-gray-400  w-full">
              <CardBody>
                <div className="grid grid-cols-6 gap-2">
                  {emojiIcons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => handleIconSelect(icon)}
                      className={`p-2 border rounded-md ${
                        formData.icon === icon ? "border-blue-500" : "border-gray-300"
                      } hover:border-blue-400`}>
                      <span className="text-xl">{icon}</span>
                    </button>
                  ))}
                </div>
              </CardBody>
            </Card>
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
