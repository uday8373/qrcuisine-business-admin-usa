import React, {useState} from "react";
import {
  Input,
  Option,
  Select,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {PiVanLight} from "react-icons/pi";
import {getAllSubCategorys} from "@/apis/food-apis";

export function AddFoodModal({
  open,
  formData,
  setFormData,
  categoryData,
  handleOpen,
  loading,
  errors,
  quantityId,
  quickInstructionId,
  sideId,
  additionalSideId,
  handleSubmit,
}) {
  const [imagePreview, setImagePreview] = useState(null);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStatusChange = (value) => {
    setFormData({
      ...formData,
      status: value,
    });
  };
  const handleCategoryChange = (value) => {
    setFormData({
      ...formData,
      category: value,
      sub_category: "",
    });
    fetchSubCategoryData(value);
  };
  const handleSubCategoryChange = (value) => {
    setFormData({
      ...formData,
      sub_category: value,
    });
  };
  const handleFoodTypeChange = (value) => {
    setFormData({
      ...formData,
      foodType: value,
    });
  };
  const handleIsSpecialChange = (value) => {
    setFormData({
      ...formData,
      isSpecial: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  const handleIsCustomizedChange = (value) => {
    setFormData({
      ...formData,
      is_customized: value,
    });
  };
  const handleIsTemperatureChange = (value) => {
    setFormData({
      ...formData,
      is_temperature: value,
    });
  };
  const handleQuantityIdChange = (value) => {
    setFormData({
      ...formData,
      quantity_id: value,
    });
  };
  const handleQuickInstructionIdChange = (value) => {
    setFormData({
      ...formData,
      quick_instruction_id: value,
    });
  };
  const handleSideIdChange = (value) => {
    setFormData({
      ...formData,
      side_id: value,
    });
  };
  const handleAdditionalSideIdChange = (value) => {
    setFormData({
      ...formData,
      additional_side_id: value,
    });
  };

  const fetchSubCategoryData = async (category_id) => {
    const subCategoryResult = await getAllSubCategorys(category_id);
    if (subCategoryResult) {
      setSubCategoryData(subCategoryResult);
    }
  };

  return (
    <>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Add Food Item
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Add a new food items to your store.
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}>
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6 h-[26rem] overflow-scroll">
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
          {/* <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium">
              Quantity
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="eg. full plate"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className={`placeholder:opacity-100 focus:!border-t-gray-900 !border-t-gray-400 ${
                errors.quantity ? "border-red-500" : ""
              }`}
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
            {errors.quantity && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.quantity}
              </Typography>
            )}
          </div> */}
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium">
              Price
            </Typography>
            <Input
              type="number"
              color="gray"
              size="lg"
              placeholder="eg. 500"
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
              Category
            </Typography>
            <Select
              className={`!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t group-hover:!border-primary ${
                errors.category ? "border-red-500" : ""
              }`}
              placeholder="Select a category"
              label="Select a category"
              size="lg"
              value={String(formData.category)}
              onChange={handleCategoryChange}
              labelProps={{
                className: "hidden",
              }}>
              {categoryData.map((category, index) => (
                <Option key={category.id} value={category.id}>
                  {category?.category_name}
                </Option>
              ))}
            </Select>
            {errors.category && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.category}
              </Typography>
            )}
          </div>
          {subCategoryData.length > 0 && (
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium">
                Sub Category
              </Typography>
              <Select
                className={`!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t group-hover:!border-primary ${
                  errors.sub_category ? "border-red-500" : ""
                }`}
                placeholder="Select a category"
                label="Select a category"
                size="lg"
                value={String(formData.sub_category)}
                onChange={handleSubCategoryChange}
                labelProps={{
                  className: "hidden",
                }}>
                {subCategoryData.map((subCategory) => (
                  <Option key={subCategory.id} value={subCategory.id}>
                    {subCategory.title}
                  </Option>
                ))}
              </Select>
              {errors.sub_category && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.sub_category}
                </Typography>
              )}
            </div>
          )}
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium">
              Status
            </Typography>
            <Select
              className={`!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t group-hover:!border-primary ${
                errors.status ? "border-red-500" : ""
              }`}
              placeholder="Select a status"
              label="Select a status"
              value={String(formData.status)}
              size="lg"
              onChange={handleStatusChange}
              labelProps={{
                className: "hidden",
              }}>
              <Option key="true" value="true">
                Available
              </Option>
              <Option key="false" value="false">
                Unavailable
              </Option>
            </Select>
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
              Food Type
            </Typography>
            <Select
              className={`!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t group-hover:!border-primary ${
                errors.foodType ? "border-red-500" : ""
              }`}
              placeholder="Select a food type"
              label="Select a food type"
              value={String(formData.foodType)}
              size="lg"
              onChange={handleFoodTypeChange}
              labelProps={{
                className: "hidden",
              }}>
              <Option key="true" value="true">
                Vegetarian
              </Option>
              <Option key="false" value="false">
                Non-Vegetarian
              </Option>
            </Select>
            {errors.foodType && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.foodType}
              </Typography>
            )}
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium">
              Is Special
            </Typography>
            <Select
              className={`!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t group-hover:!border-primary ${
                errors.isSpecial ? "border-red-500" : ""
              }`}
              placeholder="Select a is special"
              label="Select a is special"
              value={String(formData.isSpecial)}
              size="lg"
              onChange={handleIsSpecialChange}
              labelProps={{
                className: "hidden",
              }}>
              <Option key="true" value="true">
                Yes
              </Option>
              <Option key="false" value="false">
                No
              </Option>
            </Select>
            {errors.isSpecial && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.isSpecial}
              </Typography>
            )}
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium">
              Image
            </Typography>
            <label
              htmlFor="uploadFile1"
              className="bg-white text-gray-500 font-semibold text-base rounded-lg max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border border-gray-400 mx-auto font-[sans-serif]">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="object-contain h-full w-full"
                />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-11 mb-2 fill-gray-500"
                    viewBox="0 0 32 32">
                    <path
                      d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                      data-original="#000000"
                    />
                    <path
                      d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                      data-original="#000000"
                    />
                  </svg>
                  Upload file
                  <p className="text-xs font-medium text-gray-400 mt-2">
                    PNG, JPG, and SVG are allowed.
                  </p>
                </>
              )}
              <input
                type="file"
                id="uploadFile1"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {errors.image && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.image}
              </Typography>
            )}
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium">
              Is Customized
            </Typography>
            <Select
              className={`!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t group-hover:!border-primary ${
                errors.is_customized ? "border-red-500" : ""
              }`}
              placeholder="Select if customized"
              label="Select if customized"
              value={String(formData.is_customized)}
              size="lg"
              onChange={handleIsCustomizedChange}
              labelProps={{
                className: "hidden",
              }}>
              <Option key="true" value="true">
                Yes
              </Option>
              <Option key="false" value="false">
                No
              </Option>
            </Select>
            {errors.is_customized && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.is_customized}
              </Typography>
            )}
          </div>

          {formData?.is_customized === "true" && (
            <>
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 text-left font-medium">
                  Quantity Group
                </Typography>

                <Select
                  className={`!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t group-hover:!border-primary ${
                    errors.quantityId ? "border-red-500" : ""
                  }`}
                  placeholder="Select a category"
                  label="Select a category"
                  size="lg"
                  value={String(formData.quantity_id)}
                  onChange={handleQuantityIdChange}
                  labelProps={{
                    className: "hidden",
                  }}>
                  {quantityId.map((quantity, index) => (
                    <Option key={quantity.id} value={quantity.id}>
                      {quantity?.title}
                    </Option>
                  ))}
                </Select>
                {errors.quantityId && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.quantityId}
                  </Typography>
                )}
              </div>
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 text-left font-medium">
                  Quick Instruction Group
                </Typography>
                <Select
                  className={`!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t group-hover:!border-primary ${
                    errors.quickInstructionId ? "border-red-500" : ""
                  }`}
                  placeholder="Select a category"
                  label="Select a category"
                  size="lg"
                  value={String(formData.quick_instruction_id)}
                  onChange={handleQuickInstructionIdChange}
                  labelProps={{
                    className: "hidden",
                  }}>
                  {quickInstructionId.map((quickInstruction, index) => (
                    <Option key={quickInstruction.id} value={quickInstruction.id}>
                      {quickInstruction?.title}
                    </Option>
                  ))}
                </Select>
                {errors.quickInstructionId && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.quickInstructionId}
                  </Typography>
                )}
              </div>
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 text-left font-medium">
                  Side Group
                </Typography>
                <Select
                  className={`!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t group-hover:!border-primary ${
                    errors.sideId ? "border-red-500" : ""
                  }`}
                  placeholder="Select a category"
                  label="Select a category"
                  size="lg"
                  value={String(formData.side_id)}
                  onChange={handleSideIdChange}
                  labelProps={{
                    className: "hidden",
                  }}>
                  {sideId.map((Side, index) => (
                    <Option key={Side.id} value={Side.id}>
                      {Side?.title}
                    </Option>
                  ))}
                </Select>
                {errors.sideId && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.sideId}
                  </Typography>
                )}
              </div>
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 text-left font-medium">
                  Additional Side Group
                </Typography>
                <Select
                  className={`!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t group-hover:!border-primary ${
                    errors.additionalSideId ? "border-red-500" : ""
                  }`}
                  placeholder="Select a category"
                  label="Select a category"
                  size="lg"
                  value={String(formData.additional_side_id)}
                  onChange={handleAdditionalSideIdChange}
                  labelProps={{
                    className: "hidden",
                  }}>
                  {additionalSideId.map((AdditionalSide, index) => (
                    <Option key={AdditionalSide.id} value={AdditionalSide.id}>
                      {AdditionalSide?.title}
                    </Option>
                  ))}
                </Select>
                {errors.additionalSideId && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.additionalSideId}
                  </Typography>
                )}
              </div>
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 text-left font-medium">
                  Is Temperature
                </Typography>
                <Select
                  className={`!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t group-hover:!border-primary ${
                    errors.is_temperature ? "border-red-500" : ""
                  }`}
                  placeholder="Select if customized"
                  label="Select if customized"
                  value={String(formData.is_temperature)}
                  size="lg"
                  onChange={handleIsTemperatureChange}
                  labelProps={{
                    className: "hidden",
                  }}>
                  <Option key="true" value="true">
                    Yes
                  </Option>
                  <Option key="false" value="false">
                    No
                  </Option>
                </Select>
                {errors.is_temperature && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.is_temperature}
                  </Typography>
                )}
              </div>
            </>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            loading={loading}
            onClick={handleSubmit}
            disabled={!errors || loading}
            className="ml-auto">
            Add Food
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
