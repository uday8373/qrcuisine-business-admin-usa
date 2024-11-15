import React, {useEffect, useState} from "react";
import {EyeDropperIcon, PencilIcon, TrashIcon} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  useSelect,
  Spinner,
  Badge,
} from "@material-tailwind/react";
import {
  deleteGroup,
  deleteSideItems,
  getAllCountsAndData,
  getAllSideAndOptions,
  getAllSideGroup,
  insertAdditionalSidesItems,
  insertGroup,
  insertInstructionsItems,
  insertItems,
  insertQuantityItems,
  updateAdditionalSideItem,
  updateGroup,
  updateInstructionsItems,
  updateQuantityItem,
  updateSideItem,
  updateTemperatureItems,
} from "@/apis/side-and-options";
import AddItems from "@/components/side-and-options-modal/addItems";
import {DeleteSideItem} from "@/components/side-and-options-modal/deleteSideItem";
import UpdateSideModal from "@/components/side-and-options-modal/update-side";
import AddAdditionalSide from "@/components/side-and-options-modal/addAdditionalSide";
import UpdateAdditionalSide from "@/components/side-and-options-modal/updateAdditionalSide";
import AddQuantity from "@/components/side-and-options-modal/addQuantity";
import UpdateQuantity from "@/components/side-and-options-modal/updateQuantity";
import AddInstructions from "@/components/side-and-options-modal/addInstructions";
import UpdateInstructions from "@/components/side-and-options-modal/updateInstructions";
import UpdateTemperature from "@/components/side-and-options-modal/updateTemperature";

import {WEB_CONFIG} from "@/configs/website-config";
import AddGroup from "@/components/side-and-options-modal/addGroup";
import UpdateGroup from "@/components/side-and-options-modal/updateGroup";
const TABLE_HEAD = ["Name", "Parent Group", "Price", "Action"];

import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {DeleteGroup} from "@/components/side-and-options-modal/deleteGroup";
import {
  validateQuantity,
  validateQuantityUpdate,
  validationGroupSchema,
  validationSideSchema,
  validationSideUpdateSchema,
  validationTemperatureUpdateSchema,
} from "@/data/validationSchema";
import AllItemsList from "@/components/side-and-options-modal/allItemsList";

export default function SideAndOptions() {
  const [activeTab, setActiveTab] = useState("merged");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allGroup, setAllGroup] = useState([]);

  const [SidesformData, setSidesFormData] = useState({
    title: "",
    price: null,
    is_available: true,
    is_veg: true,
    quantity: "",
    is_free: true,
    group_id: "",
  });

  const [formLoading, setFormLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [tabs, setTabs] = useState([
    {label: "Groups", value: "merged", count: 0},
    {label: "Sides", value: "food_sides", count: 0},
    {label: "Additional Sides", value: "additional_sides", count: 0},
    {label: "Quantity", value: "food_quantity", count: 0},
    {label: "Quick Instructions", value: "quick_instructions", count: 0},
    {label: "Temperature", value: "temperature", count: 0},
  ]);

  const [quantityFormData, setQuantityFormData] = useState({
    title: "",
    is_available: true,
    group_id: "",
    price: null,
    is_free: true,
  });

  const [instructionsFormData, setInstructionsFormData] = useState({
    title: "",
    is_available: true,
    group_id: "",
    price: null,
    is_free: true,
  });

  const [temperatureFormData, setTemperatureFormData] = useState({
    title: "",
    is_available: true,
    value: null,
    price: null,
  });
  const [groupFormData, setGroupFormData] = useState({
    title: "",
    key_value: "",
    type: "",
    group_category: "",
  });

  const [addItemopen, setAddItemOpen] = useState(false);
  const [openUpdateSideModal, setOpenUpdateSideModal] = useState(false);
  const [deleteSideItemopen, setDeleteSideItemOpen] = useState(false);
  const [openAdditionalModal, setOpenAdditionalModal] = useState(false);
  const [openUpdateAdditionalSideModal, setOpenUpdateAdditionalSideModal] =
    useState(false);
  const [openQuantityModal, setOpenQuantityModal] = useState(false);
  const [openUpdateQuantityModal, setOpenUpdateQuantityModal] = useState(false);
  const [openInstructionsModal, setOpenInstructionsModal] = useState(false);
  const [openUpdateInstructionsModal, setOpenUpdateInstructionsModal] = useState(false);

  const [openUpdateTemperatureModal, setOpenUpdateTemperatureModal] = useState(false);
  const [openGroupModal, setOpenGroupModal] = useState(false);
  const [openUpdateGroupModal, setOpenUpdateGroupModal] = useState(false);

  const [maxItems, setMaxItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxRow, setMaxRow] = useState(10);
  const [openDeleteGroupModal, setOpenDeleteGroupModal] = useState(false);

  const [openAllItemDrawer, setOpenAllItemDrawer] = useState(false);

  const [selectedGroupId, setSelectedGroupId] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await getAllSideAndOptions(activeTab, currentPage, maxRow);
      setData(result.data);
      setMaxItems(result.count || 0);
      console.log("Data fetched......>:", result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCount = async () => {
    const data = await getAllCountsAndData();

    if (data) {
      setTabs([
        {label: "Groups", value: "merged", count: data.side_group.count},
        {label: "Sides", value: "food_sides", count: data.sides.count},
        {
          label: "Additional Sides",
          value: "additional_sides",
          count: data.additional_sides.count,
        },
        {label: "Quantity", value: "food_quantity", count: data.quantity.count},
        {
          label: "Quick Instructions",
          value: "quick_instructions",
          count: data.quick_instructions.count,
        },
        {label: "Temperature", value: "temperature", count: data.temperature.count},
      ]);
    }
  };

  const fetchAllGroupData = async () => {
    setIsLoading(true);
    try {
      const result = await getAllSideGroup();
      setAllGroup(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCount();
    fetchAllGroupData();
  }, [activeTab, maxRow, currentPage]);

  const handleTabChange = (value) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(maxItems / maxRow);

  const handlePageChange = (page) => {
    setIsLoading(true);
    setCurrentPage(page);
  };

  const resetSidesFormData = () => {
    setSidesFormData({
      title: "",
      price: 0,
      is_available: true,
      is_veg: true,
      quantity: "",
      is_free: true,
      group_id: "",
    });
  };

  const resetQuantityFormData = () => {
    setQuantityFormData({
      title: "",
      is_available: true,
      group_id: "",
      price: null,
      is_free: true,
    });
  };

  const resetInstructionsFormData = () => {
    setInstructionsFormData({
      title: "",
      is_available: true,
      group_id: "",
      price: null,
      is_free: true,
    });
  };
  const resetTemperatureFormData = () => {
    setTemperatureFormData({
      title: "",
      is_available: true,
      value: null,
      price: null,
    });
  };
  const resetGroupFormData = () => {
    setGroupFormData({
      title: "",
      key_value: "",
      type: "",
      group_category: "",
    });
  };

  {
    /********************* Side ********************/
  }

  const validateFormSide = async () => {
    try {
      await validationSideSchema.validate(SidesformData, {abortEarly: false});
      setErrors({});
      return true;
    } catch (validationErrors) {
      const formattedErrors = {};
      if (validationErrors.inner && validationErrors.inner.length > 0) {
        validationErrors.inner.forEach((error) => {
          formattedErrors[error.path] = error.message;
        });
      }
      setErrors(formattedErrors);
      return false;
    }
  };
  const validateFormSideUpdate = async () => {
    try {
      await validationSideUpdateSchema.validate(SidesformData, {abortEarly: false});
      setErrors({});
      return true;
    } catch (validationErrors) {
      const formattedErrors = {};
      if (validationErrors.inner && validationErrors.inner.length > 0) {
        validationErrors.inner.forEach((error) => {
          formattedErrors[error.path] = error.message;
        });
      }
      setErrors(formattedErrors);
      return false;
    }
  };

  {
    /**** Side Insert ****/
  }

  const toogleSidesAddModal = () => {
    resetSidesFormData();
    setAddItemOpen(!addItemopen);
    setErrors({});
  };

  const handleSidesSubmit = async () => {
    const isValid = await validateFormSide();
    if (!isValid) return;
    setFormLoading(true);
    try {
      await insertItems(SidesformData);
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      resetSidesFormData();
      setFormLoading(false);
      toogleSidesAddModal();
      fetchData();
      fetchCount();
    }
  };

  {
    /**** Side Update ****/
  }

  const toggleUpdateSideModal = () => {
    setOpenUpdateSideModal(!openUpdateSideModal);
    setErrors({});
  };

  const handleSideUpdate = (item) => {
    setSidesFormData({
      id: item.id,
      title: item.title,
      price: item.price,
      is_available: item.is_available,
      is_veg: item.is_veg,
      quantity: item.quantity,
      is_free: item.is_free,
      group_id: item.group_id,
    });
    toggleUpdateSideModal();
  };

  const handleSideUpdateSubmit = async () => {
    const isValid = await validateFormSideUpdate();
    if (!isValid) return;
    setFormLoading(true);
    try {
      await updateSideItem(SidesformData);
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      resetSidesFormData();
      setFormLoading(false);
      toggleUpdateSideModal();
      fetchData();
      fetchCount();
    }
  };

  {
    /********************* Additional Side  ********************/
  }

  {
    /**** Additional Side Insert ****/
  }

  const toogleAdditionalSidesAddModal = () => {
    resetSidesFormData();
    setOpenAdditionalModal(!openAdditionalModal);
    setErrors({});
  };

  const handleAdditionalSidesSubmit = async () => {
    const isValid = await validateFormSide();
    if (!isValid) return;
    setFormLoading(true);
    try {
      await insertAdditionalSidesItems(SidesformData);
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      resetSidesFormData();
      setFormLoading(false);
      toogleAdditionalSidesAddModal();
      fetchData();
      fetchCount();
    }
  };

  {
    /**** Additional Side Update ****/
  }

  const toggleUpdateAdditionalSideModal = () => {
    setOpenUpdateAdditionalSideModal(!openUpdateAdditionalSideModal);
    setErrors({});
  };

  const handleAdditionalSideUpdate = (item) => {
    setSidesFormData({
      id: item.id,
      title: item.title,
      price: item.price,
      is_available: item.is_available,
      is_veg: item.is_veg,
      quantity: item.quantity,
      is_free: item.is_free,
      group_id: item.group_id,
    });
    toggleUpdateAdditionalSideModal();
  };

  const handleAdditionalSideUpdateSubmit = async () => {
    const isValid = await validateFormSideUpdate();
    if (!isValid) return;
    setFormLoading(true);
    try {
      await updateAdditionalSideItem(SidesformData);
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      resetSidesFormData();
      setFormLoading(false);
      toggleUpdateAdditionalSideModal();
      fetchData();
      fetchCount();
    }
  };

  {
    /****************************************************/
  }
  {
    /********************* Quantity ********************/
  }

  const validateFormQuantity = async () => {
    try {
      await validateQuantity.validate(quantityFormData, {abortEarly: false});
      setErrors({});
      return true;
    } catch (validationErrors) {
      const formattedErrors = {};
      if (validationErrors.inner && validationErrors.inner.length > 0) {
        validationErrors.inner.forEach((error) => {
          formattedErrors[error.path] = error.message;
        });
      }
      setErrors(formattedErrors);
      return false;
    }
  };
  const validateFormQuantityUpdate = async () => {
    try {
      await validateQuantityUpdate.validate(quantityFormData, {abortEarly: false});

      setErrors({});
      return true;
    } catch (validationErrors) {
      const formattedErrors = {};
      if (validationErrors.inner && validationErrors.inner.length > 0) {
        validationErrors.inner.forEach((error) => {
          formattedErrors[error.path] = error.message;
        });
      }
      setErrors(formattedErrors);
      return false;
    }
  };

  /**** Quantity Insert ****/

  const toogleQuantityAddModal = () => {
    resetQuantityFormData();
    setOpenQuantityModal(!openQuantityModal);
    setErrors({});
  };

  const handleQuantitySubmit = async () => {
    const isValid = await validateFormQuantity();
    if (!isValid) return;
    setFormLoading(true);
    try {
      await insertQuantityItems(quantityFormData);
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      resetQuantityFormData();
      setFormLoading(false);
      toogleQuantityAddModal();
      fetchData();
      fetchCount();
    }
  };

  {
    /**** Quantity Update ****/
  }

  const toggleUpdateQuantityModal = () => {
    setOpenUpdateQuantityModal(!openUpdateQuantityModal);
    setErrors({});
  };

  const handleQuantityUpdate = (item) => {
    setQuantityFormData({
      id: item.id,
      title: item.title,
      price: item.price,
      is_available: item.is_available,
      is_free: item.is_free,
      group_id: item.group_id,
    });
    toggleUpdateQuantityModal();
  };

  const handleQuantityUpdateSubmit = async () => {
    const isValid = await validateFormQuantityUpdate();
    if (!isValid) return;
    setFormLoading(true);
    try {
      await updateQuantityItem(quantityFormData);
    } catch (error) {
      console.error("Error updating :", error);
    } finally {
      resetQuantityFormData();
      setFormLoading(false);
      toggleUpdateQuantityModal();
      fetchData();
      fetchCount();
    }
  };

  {
    /********************* Instructions ********************/
  }

  const validateFormInstructions = async () => {
    try {
      await validateQuantity.validate(instructionsFormData, {abortEarly: false});
      setErrors({});
      return true;
    } catch (validationErrors) {
      const formattedErrors = {};
      if (validationErrors.inner && validationErrors.inner.length > 0) {
        validationErrors.inner.forEach((error) => {
          formattedErrors[error.path] = error.message;
        });
      }
      setErrors(formattedErrors);
      return false;
    }
  };
  const validateFormInstructionsUpdate = async () => {
    try {
      await validateQuantityUpdate.validate(instructionsFormData, {abortEarly: false});

      setErrors({});
      return true;
    } catch (validationErrors) {
      const formattedErrors = {};
      if (validationErrors.inner && validationErrors.inner.length > 0) {
        validationErrors.inner.forEach((error) => {
          formattedErrors[error.path] = error.message;
        });
      }
      setErrors(formattedErrors);
      return false;
    }
  };

  /**** Instructions Insert ****/

  const toogleInstructionsAddModal = () => {
    resetInstructionsFormData();
    setOpenInstructionsModal(!openInstructionsModal);
    setErrors({});
  };

  const handleInstructionsSubmit = async () => {
    const isValid = await validateFormInstructions();
    if (!isValid) return;
    setFormLoading(true);
    try {
      await insertInstructionsItems(instructionsFormData);
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      resetInstructionsFormData();
      setFormLoading(false);
      toogleInstructionsAddModal();
      fetchData();
      fetchCount();
    }
  };

  {
    /**** Instructions Update ****/
  }

  const toggleUpdateInstructionsModal = () => {
    setOpenUpdateInstructionsModal(!openUpdateInstructionsModal);
    setErrors({});
  };

  const handleInstructionsUpdate = (item) => {
    setInstructionsFormData({
      id: item.id,
      title: item.title,
      price: item.price,
      is_available: item.is_available,
      is_free: item.is_free,
      group_id: item.group_id,
    });
    toggleUpdateInstructionsModal();
  };

  const handleInstructionsUpdateSubmit = async () => {
    const isValid = await validateFormInstructionsUpdate();
    if (!isValid) return;
    setFormLoading(true);
    try {
      await updateInstructionsItems(instructionsFormData);
    } catch (error) {
      console.error("Error updating :", error);
    } finally {
      resetInstructionsFormData();
      setFormLoading(false);
      toggleUpdateInstructionsModal();
      fetchData();
      fetchCount();
    }
  };

  {
    /********************* Temperature ********************/
  }

  const validateFormTemperatureUpdate = async () => {
    try {
      await validationTemperatureUpdateSchema.validate(temperatureFormData, {
        abortEarly: false,
      });

      setErrors({});
      return true;
    } catch (validationErrors) {
      const formattedErrors = {};
      if (validationErrors.inner && validationErrors.inner.length > 0) {
        validationErrors.inner.forEach((error) => {
          formattedErrors[error.path] = error.message;
        });
      }
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleTemperatureUpdate = (value) => {
    setTemperatureFormData({
      title: value.title,
      value: value.value,
      id: value.id,
      is_available: value.is_available,
      price: value.price,
    });
    toggleUpdateTemperatureModal();
  };

  const toggleUpdateTemperatureModal = () => {
    setOpenUpdateTemperatureModal(!openUpdateTemperatureModal);
    setErrors({});
  };

  const handleUpdateTemperatureSubmit = async () => {
    const isValid = await validateFormTemperatureUpdate();
    if (!isValid) return;
    setFormLoading(true);
    try {
      await updateTemperatureItems(temperatureFormData);
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      resetTemperatureFormData();
      setFormLoading(false);
      fetchData();
      fetchCount();

      toggleUpdateTemperatureModal();
    }
  };

  {
    /********************* Group ********************/
  }

  /**** Group Insert ****/

  const validateFormGroup = async () => {
    try {
      await validationGroupSchema.validate(groupFormData, {abortEarly: false});
      setErrors({});
      return true;
    } catch (validationErrors) {
      const formattedErrors = {};
      if (validationErrors.inner && validationErrors.inner.length > 0) {
        validationErrors.inner.forEach((error) => {
          formattedErrors[error.path] = error.message;
        });
      }
      setErrors(formattedErrors);
      return false;
    }
  };

  const toogleGroupAddModal = () => {
    resetGroupFormData();
    setOpenGroupModal(!openGroupModal);
    setErrors({});
  };

  const handleGroupSubmit = async () => {
    const isValid = await validateFormGroup();
    if (!isValid) return;
    setFormLoading(true);
    try {
      await insertGroup(groupFormData);
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      resetGroupFormData();
      setFormLoading(false);
      toogleGroupAddModal();
      fetchData();
      fetchCount();
    }
  };

  /**** Group Update ****/

  const handleGroupUpdate = (value) => {
    setGroupFormData({
      id: value.id,
      title: value.title,
      key_value: value.key_value,
      type: value.type,
      group_category: value.group_category,
    });
    toggleUpdateGroupModal();
  };

  const toggleUpdateGroupModal = () => {
    setOpenUpdateGroupModal(!openUpdateGroupModal);
    setErrors({});
  };

  const handleUpdateGroupSubmit = async () => {
    const isValid = await validateFormGroup();
    if (!isValid) return;
    setFormLoading(true);
    try {
      await updateGroup(groupFormData);
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      resetGroupFormData();
      setFormLoading(false);
      fetchData();
      fetchCount();

      toggleUpdateGroupModal();
    }
  };

  /**** Group Delete ****/

  const toggleDeleteGroupModal = () => {
    setOpenDeleteGroupModal(!openDeleteGroupModal);
  };

  const handleDelete = (value) => {
    if (value && value.id) {
      setGroupFormData({
        id: value.id,
      });
      toggleDeleteGroupModal();
    }
  };

  const handleDeleteSubmit = async () => {
    setFormLoading(true);
    try {
      await deleteGroup(groupFormData);
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.warning(
        <div className="w-full flex flex-col select-none cursor-move">
          <Typography variant="paragraph" className="font-medium" color="blue-gray">
            You cannot delete this category
          </Typography>
          <Typography
            variant="small"
            className="font-normal opacity-70"
            color="blue-gray">
            You cannot delete a Category which is already selected by a food item
          </Typography>
        </div>,
      );
    } finally {
      resetGroupFormData();
      setFormLoading(false);
      toggleDeleteGroupModal();
      fetchCount();
      fetchData();
    }
  };

  {
    /************* handleSubmit For Insert ***************/
  }

  const toogleAddModal = () => {
    switch (activeTab) {
      case "food_sides":
        toogleSidesAddModal();
        break;
      case "additional_sides":
        toogleAdditionalSidesAddModal();
        break;
      case "food_quantity":
        toogleQuantityAddModal();
        break;
      case "quick_instructions":
        toogleInstructionsAddModal();
        break;
      // Add more cases as needed for other tabs
      default:
        toogleGroupAddModal();
    }
  };

  {
    /************* handleSubmit For Update ***************/
  }

  const handleEditActions = (id) => {
    const item = data.find((item) => item.id === id);
    if (!item) {
      return;
    }

    switch (activeTab) {
      case "food_sides":
        handleSideUpdate(item);
        break;
      case "additional_sides":
        handleAdditionalSideUpdate(item);
        break;
      case "food_quantity":
        handleQuantityUpdate(item);
        break;
      case "quick_instructions":
        handleInstructionsUpdate(item);
        break;
      // Add more cases as needed for other tabs
      default:
        console.log(`Edit item with ID: ${id}`);
    }
  };

  {
    /********************* Delete ********************/
  }

  const toggleSideDeleteModal = () => {
    setDeleteSideItemOpen(!deleteSideItemopen);
  };

  const handleSideDelete = (value) => {
    if (value && value.id) {
      setSidesFormData({
        id: value.id,
      });
      toggleSideDeleteModal();
    }
  };

  const handleDeleteSideSubmit = async () => {
    setFormLoading(true);
    try {
      await deleteSideItems(SidesformData, activeTab);
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      resetSidesFormData();
      setFormLoading(false);
      toggleSideDeleteModal();
      fetchData();
      fetchCount();
    }
  };
  {
    /****************************************************/
  }
  {
    /*********************   All Items Drawer    *******************/
  }

  const toogleOpenItemDrawer = (value) => {
    setSelectedGroupId(value);
    setOpenAllItemDrawer(!openAllItemDrawer);
  };

  {
    /****************************************************/
  }

  return (
    <div className="mt-6 mb-8 flex flex-col gap-12 min-h-[100vh]">
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Sides & food options
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Variations of selection of a food item.
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              {activeTab !== "temperature" && (
                <Button
                  onClick={toogleAddModal}
                  className="flex items-center gap-3"
                  size="sm">
                  {activeTab === "food_sides"
                    ? "Add Side"
                    : activeTab === "additional_sides"
                    ? "Add Additional Side"
                    : activeTab === "food_quantity"
                    ? "Add Quantity"
                    : activeTab === "quick_instructions"
                    ? "Add Instruction"
                    : "Add Item"}
                </Button>
              )}
            </div>
          </div>

          <Tabs
            value={activeTab}
            className="w-full whitespace-nowrap overflow-x-auto scrollbar-hidden">
            <TabsHeader>
              {tabs?.map(({label, value, count}) => (
                <Tab
                  className="py-2"
                  key={value}
                  value={value}
                  onClick={() => handleTabChange(value)}>
                  <div className="flex items-center gap-2 ">
                    {label}
                    <Chip
                      variant="ghost"
                      value={count.toString().padStart(2, "0") || "00"}
                      size="sm"
                    />
                  </div>
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          {(() => {
            switch (activeTab) {
              case "merged":
                return (
                  <>
                    {isLoading ? (
                      <div className="flex w-full h-[350px] justify-center items-center">
                        <Spinner className="h-8 w-8" />
                      </div>
                    ) : (
                      <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                          <tr>
                            {["Name", "Type", "No. Of Items", "Action"].map((head) => (
                              <th
                                key={head}
                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal leading-none opacity-70">
                                  {head}
                                </Typography>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody
                          className={`${
                            data.length === 0 && "h-[350px]"
                          } relative w-full`}>
                          {data.length === 0 ? (
                            <div className="w-full absolute flex justify-center items-center h-full">
                              <Typography
                                variant="h6"
                                color="blue-gray"
                                className="font-normal">
                                No Data Found
                              </Typography>
                            </div>
                          ) : (
                            data.map(
                              (
                                {
                                  id,
                                  is_available,
                                  type,
                                  key_value,
                                  group_category,
                                  title,
                                  additional_sides,
                                  food_sides,
                                  quick_instructions,
                                  food_quantity,
                                },
                                index,
                              ) => {
                                const isLast = index === data.length - 1;
                                const classes = isLast
                                  ? "p-4"
                                  : "p-4 border-b border-blue-gray-50";

                                return (
                                  <tr key={id}>
                                    <td
                                      className={`${classes} ${
                                        is_available ? "bg-green-500" : "bg-green-500"
                                      } bg-opacity-20 relative w-72`}>
                                      <div
                                        className={`w-2 h-full top-0 absolute left-0 ${
                                          is_available ? "bg-green-500" : "bg-green-700"
                                        }`}
                                      />
                                      <Typography
                                        variant="paragraph"
                                        color="blue-gray"
                                        className="font-medium">
                                        {title || "N/A"}
                                      </Typography>
                                    </td>

                                    <td className={classes}>
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal">
                                        {type || "N/A"}
                                      </Typography>
                                    </td>
                                    <td className={classes}>
                                      <Button
                                        className="flex w-fit gap-2 "
                                        variant="outlined"
                                        size="sm"
                                        onClick={() => toogleOpenItemDrawer(id)}>
                                        <div className="w-5 h-5">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            class="size-6">
                                            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                            <path
                                              fill-rule="evenodd"
                                              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                                              clip-rule="evenodd"
                                            />
                                          </svg>
                                        </div>
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal">
                                          {additional_sides?.length > 0
                                            ? additional_sides?.length
                                                .toString()
                                                .padStart(2, "0")
                                            : food_sides?.length > 0
                                            ? food_sides?.length
                                                .toString()
                                                .padStart(2, "0")
                                            : quick_instructions?.length > 0
                                            ? quick_instructions?.length
                                                .toString()
                                                .padStart(2, "0")
                                            : food_quantity?.length > 0
                                            ? food_quantity?.length
                                                .toString()
                                                .padStart(2, "0")
                                            : "00"}
                                        </Typography>
                                      </Button>
                                    </td>

                                    <td className={`${classes} w-28`}>
                                      <Tooltip content="Edit Group">
                                        <IconButton
                                          onClick={() => {
                                            handleGroupUpdate({
                                              id: id,
                                              title: title,
                                              key_value: key_value,
                                              type: type,
                                              group_category: group_category,
                                            });
                                          }}
                                          variant="text">
                                          <PencilIcon className="h-4 w-4" />
                                        </IconButton>
                                      </Tooltip>

                                      <Tooltip content="Delete Group">
                                        <IconButton
                                          onClick={() =>
                                            handleDelete({
                                              id: id,
                                            })
                                          }
                                          variant="text">
                                          <TrashIcon className="h-4 w-4" />
                                        </IconButton>
                                      </Tooltip>
                                    </td>
                                  </tr>
                                );
                              },
                            )
                          )}
                        </tbody>
                      </table>
                    )}
                  </>
                );

              case "food_sides":
              case "additional_sides":
              case "food_quantity":
              case "quick_instructions":
                return (
                  <>
                    {isLoading ? (
                      <div className="flex w-full h-[350px] justify-center items-center">
                        <Spinner className="h-8 w-8" />
                      </div>
                    ) : (
                      <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                          <tr>
                            {TABLE_HEAD.map((head) => (
                              <th
                                key={head}
                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal leading-none opacity-70">
                                  {head}
                                </Typography>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody
                          className={`${
                            data.length === 0 && "h-[350px]"
                          } relative w-full`}>
                          {data.length === 0 ? (
                            <div className="w-full absolute flex justify-center items-center h-full">
                              <Typography
                                variant="h6"
                                color="blue-gray"
                                className="font-normal">
                                No Data Found
                              </Typography>
                            </div>
                          ) : (
                            data.map(
                              (
                                {created_at, id, is_available, group_id, price, title},
                                index,
                              ) => {
                                const isLast = index === data.length - 1;
                                const classes = isLast
                                  ? "p-4"
                                  : "p-4 border-b border-blue-gray-50";

                                return (
                                  <tr key={id}>
                                    <td
                                      className={`${classes} ${
                                        is_available ? "bg-green-500" : "bg-gray-500"
                                      } bg-opacity-20 relative w-72`}>
                                      <div
                                        className={`w-2 h-full top-0 absolute left-0 ${
                                          is_available ? "bg-green-500" : "bg-gray-700"
                                        }`}
                                      />
                                      <Typography
                                        variant="paragraph"
                                        color="blue-gray"
                                        className="font-medium">
                                        {title || "N/A"}
                                      </Typography>
                                    </td>

                                    <td className={classes}>
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal">
                                        {group_id?.title || "N/A"}
                                      </Typography>
                                    </td>
                                    <td className={classes}>
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal">
                                        {price
                                          ? `${WEB_CONFIG?.currencySymbol}${price.toFixed(
                                              2,
                                            )}`
                                          : "Free"}
                                      </Typography>
                                    </td>
                                    <td className={`${classes} w-28`}>
                                      <Tooltip content="Edit">
                                        <IconButton
                                          onClick={() => handleEditActions(id)}
                                          variant="text">
                                          <PencilIcon className="h-4 w-4" />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip content="Delete">
                                        <IconButton
                                          onClick={() =>
                                            handleSideDelete({
                                              id: id,
                                            })
                                          }
                                          variant="text">
                                          <TrashIcon className="h-4 w-4" />
                                        </IconButton>
                                      </Tooltip>
                                    </td>
                                  </tr>
                                );
                              },
                            )
                          )}
                        </tbody>
                      </table>
                    )}
                  </>
                );
              case "temperature":
                return (
                  <>
                    {isLoading ? (
                      <div className="flex w-full h-[350px] justify-center items-center">
                        <Spinner className="h-8 w-8" />
                      </div>
                    ) : (
                      <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                          <tr>
                            {["Name", "Value", "Price", "Action"].map((head) => (
                              <th
                                key={head}
                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal leading-none opacity-70">
                                  {head}
                                </Typography>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody
                          className={`${
                            data.length === 0 && "h-[350px]"
                          } relative w-full`}>
                          {data.length === 0 ? (
                            <div className="w-full absolute flex justify-center items-center h-full">
                              <Typography
                                variant="h6"
                                color="blue-gray"
                                className="font-normal">
                                No Data Found
                              </Typography>
                            </div>
                          ) : (
                            data.map(
                              (
                                {created_at, id, is_available, value, price, title},
                                index,
                              ) => {
                                const isLast = index === data.length - 1;
                                const classes = isLast
                                  ? "p-4"
                                  : "p-4 border-b border-blue-gray-50";

                                return (
                                  <tr key={id}>
                                    <td
                                      className={`${classes} ${
                                        is_available ? "bg-green-500" : "bg-gray-500"
                                      } bg-opacity-20 relative w-72`}>
                                      <div
                                        className={`w-2 h-full top-0 absolute left-0 ${
                                          is_available ? "bg-green-500" : "bg-gray-700"
                                        }`}
                                      />
                                      <Typography
                                        variant="paragraph"
                                        color="blue-gray"
                                        className="font-medium">
                                        {title || "N/A"}
                                      </Typography>
                                    </td>
                                    <td className={classes}>
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal">
                                        {value || "N/A"}
                                      </Typography>
                                    </td>
                                    <td className={classes}>
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal">
                                        {price
                                          ? `${
                                              WEB_CONFIG?.currencySymbol
                                            } ${price.toFixed(2)}`
                                          : "Free"}
                                      </Typography>
                                    </td>

                                    <td className={`${classes} w-28`}>
                                      <Tooltip content="Edit Temperature">
                                        <IconButton
                                          onClick={() =>
                                            handleTemperatureUpdate({
                                              id: id,
                                              title: title,
                                              value: value,
                                              price: price,
                                              is_available: is_available,
                                            })
                                          }
                                          variant="text">
                                          <PencilIcon className="h-4 w-4" />
                                        </IconButton>
                                      </Tooltip>
                                    </td>
                                  </tr>
                                );
                              },
                            )
                          )}
                        </tbody>
                      </table>
                    )}
                  </>
                );

              default:
                return null;
            }
          })()}
        </CardBody>

        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {currentPage} of {totalPages}
          </Typography>
          <div className="flex items-center gap-2 mt-4">
            {(() => {
              const pages = [];
              if (totalPages <= 5) {
                for (let i = 1; i <= totalPages; i++) {
                  pages.push(i);
                }
              } else {
                if (currentPage <= 3) {
                  pages.push(1, 2, 3, 4, "...");
                } else if (currentPage >= totalPages - 2) {
                  pages.push(
                    "...",
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages,
                  );
                } else {
                  pages.push("...", currentPage - 1, currentPage, currentPage + 1, "...");
                }
              }

              return pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page === "..." ? (
                    <span className="text-blue-gray-500">...</span>
                  ) : (
                    <IconButton
                      variant={page === currentPage ? "filled" : "text"}
                      disabled={page === currentPage}
                      size="sm"
                      onClick={() => handlePageChange(page)}>
                      {page}
                    </IconButton>
                  )}
                </React.Fragment>
              ));
            })()}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outlined"
              size="sm"
              className="w-24"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}>
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              className="w-24"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      <AddItems
        open={addItemopen}
        handleOpen={toogleSidesAddModal}
        handleSubmit={handleSidesSubmit}
        formData={SidesformData}
        setFormData={setSidesFormData}
        loading={formLoading}
        errors={errors}
        setErrors={setErrors}
        allGroup={allGroup}
      />

      <UpdateSideModal
        open={openUpdateSideModal}
        handleOpen={toggleUpdateSideModal}
        handleSubmit={handleSideUpdateSubmit}
        formData={SidesformData}
        setFormData={setSidesFormData}
        loading={formLoading}
        errors={errors}
        allGroup={allGroup}
      />

      <DeleteSideItem
        open={deleteSideItemopen}
        setOpen={setDeleteSideItemOpen}
        handleOpen={toggleSideDeleteModal}
        handleSubmit={handleDeleteSideSubmit}
        loading={formLoading}
      />

      <AddAdditionalSide
        open={openAdditionalModal}
        handleOpen={toogleAdditionalSidesAddModal}
        handleSubmit={handleAdditionalSidesSubmit}
        formData={SidesformData}
        setFormData={setSidesFormData}
        loading={formLoading}
        errors={errors}
        allGroup={allGroup}
      />

      <UpdateAdditionalSide
        open={openUpdateAdditionalSideModal}
        handleOpen={toggleUpdateAdditionalSideModal}
        handleSubmit={handleAdditionalSideUpdateSubmit}
        formData={SidesformData}
        setFormData={setSidesFormData}
        loading={formLoading}
        errors={errors}
      />

      <AddQuantity
        open={openQuantityModal}
        handleOpen={toogleQuantityAddModal}
        handleSubmit={handleQuantitySubmit}
        formData={quantityFormData}
        setFormData={setQuantityFormData}
        loading={formLoading}
        errors={errors}
        setErrors={setErrors}
        allGroup={allGroup}
      />

      <UpdateQuantity
        open={openUpdateQuantityModal}
        handleOpen={toggleUpdateQuantityModal}
        handleSubmit={handleQuantityUpdateSubmit}
        formData={quantityFormData}
        setFormData={setQuantityFormData}
        loading={formLoading}
        errors={errors}
        setErrors={setErrors}
      />

      <AddInstructions
        open={openInstructionsModal}
        handleOpen={toogleInstructionsAddModal}
        handleSubmit={handleInstructionsSubmit}
        formData={instructionsFormData}
        setFormData={setInstructionsFormData}
        loading={formLoading}
        errors={errors}
        setErrors={setErrors}
        allGroup={allGroup}
      />

      <UpdateInstructions
        open={openUpdateInstructionsModal}
        handleOpen={toggleUpdateInstructionsModal}
        handleSubmit={handleInstructionsUpdateSubmit}
        formData={instructionsFormData}
        setFormData={setInstructionsFormData}
        loading={formLoading}
        errors={errors}
        setErrors={setErrors}
        allGroup={allGroup}
      />

      <UpdateTemperature
        open={openUpdateTemperatureModal}
        handleOpen={toggleUpdateTemperatureModal}
        handleSubmit={handleUpdateTemperatureSubmit}
        formData={temperatureFormData}
        setFormData={setTemperatureFormData}
        loading={formLoading}
        errors={errors}
        setErrors={setErrors}
      />

      <AddGroup
        open={openGroupModal}
        handleOpen={toogleGroupAddModal}
        handleSubmit={handleGroupSubmit}
        formData={groupFormData}
        setFormData={setGroupFormData}
        loading={formLoading}
        errors={errors}
        setErrors={setErrors}
      />

      <UpdateGroup
        open={openUpdateGroupModal}
        handleOpen={toggleUpdateGroupModal}
        handleSubmit={handleUpdateGroupSubmit}
        formData={groupFormData}
        setFormData={setGroupFormData}
        loading={formLoading}
        errors={errors}
        setErrors={setErrors}
      />

      <DeleteGroup
        open={openDeleteGroupModal}
        setOpen={setOpenDeleteGroupModal}
        handleOpen={toggleDeleteGroupModal}
        handleSubmit={handleDeleteSubmit}
        loading={formLoading}
      />

      <AllItemsList
        open={openAllItemDrawer}
        closeDrawer={toogleOpenItemDrawer}
        data={data}
        selectedGroupId={selectedGroupId}
      />
    </div>
  );
}
