import React, {useEffect, useState} from "react";

import {LightBulbIcon, PencilIcon, TrashIcon} from "@heroicons/react/24/solid";
import {ArrowDownTrayIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Spinner,
  Switch,
} from "@material-tailwind/react";
import {
  deleteTips,
  getTipsApis,
  InsertTips,
  updatedTips,
  updatedTipsPercentage,
} from "@/apis/tips-apis";
import AddTips from "@/components/tips-modal/add-tips";
import DeleteTips from "@/components/tips-modal/delete-tips";
import UpdateTips from "@/components/tips-modal/update-tips";
import {WEB_CONFIG} from "@/configs/website-config";

const TABLE_HEAD = ["Restaurant", "Amount", ""];

export default function Tips() {
  const [tips, getTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openDeleteTips, setOpenDeleteTips] = useState(false);
  const [tipsIdToDelete, setTipsIdToDelete] = useState(null);
  const [selectedTips, setSelectedTips] = useState(null);
  const [openAddTips, setOpenAddTips] = useState(false);
  const [isPercentage, setIsPercentage] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleOpenDeleteTips = () => setOpenDeleteTips(!openDeleteTips);
  const handleOpenUpdateTips = (tip = null) => {
    setSelectedTips(tip);
    setOpenAddTips(!openAddTips);
  };

  const fatchTipsData = async () => {
    try {
      const tipsResult = await getTipsApis();
      if (tipsResult) {
        setIsPercentage(tipsResult.data[0]?.restaurant_id?.is_tip_percentage);
        getTips(tipsResult.data);
      }
    } catch (error) {
      console.error("Error fetching Cloudinary data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTips = async (newTipsData) => {
    setLoading(true);
    try {
      await InsertTips(newTipsData);
      handleOpen();
      fatchTipsData();
    } catch (error) {
      console.error("Error inserting tips data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await deleteTips({id: tipsIdToDelete});
    } catch (error) {
      console.error("Error deleting Tips :", error);
    } finally {
      setLoading(false);
      handleOpenDeleteTips();
      fatchTipsData();
    }
  };

  const handleDeleteButtonClick = (id) => {
    setTipsIdToDelete(id);
    handleOpenDeleteTips();
  };

  const handleConfirmUpdate = async (updatedData) => {
    setLoading(true);
    try {
      await updatedTips(selectedTips.id, updatedData);
      handleOpenUpdateTips();
      fatchTipsData();
    } catch (error) {
      console.error("Error updating Tips :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    const newValue = !isPercentage;
    setIsPercentage(newValue);

    try {
      const updatedData = await updatedTipsPercentage(newValue);
      fatchTipsData();
    } catch (error) {
      console.error("Error updating tips percentage:", error);
    }
  };

  useEffect(() => {
    fatchTipsData();
  }, []);

  return (
    <div className="mt-6">
      <Card className="h-full w-full mb-8">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Tips list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all Tips
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-5 md:w-max">
              <Switch
                label={isPercentage ? "Percentage" : "Amount"}
                checked={isPercentage}
                onChange={handleToggle}
              />
              <Button onClick={handleOpen} className="flex items-center gap-3" size="md">
                <LightBulbIcon strokeWidth={2} className="h-4 w-4" /> Add Tips
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          {loading ? (
            <div className="flex w-full h-[350px] justify-center items-center">
              <Spinner className="h-8 w-8" />
            </div>
          ) : (
            <table className="w-full min-w-max table-auto text-left">
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
              <tbody className={`${tips.length === 0 && "h-[300px]"} relative w-full`}>
                {tips.length === 0 ? (
                  <div className="w-full absolute flex justify-center items-center h-full">
                    <Typography variant="h6" color="blue-gray" className="font-normal">
                      No Tips Found
                    </Typography>
                  </div>
                ) : (
                  tips?.map(({amount, restaurant_id, id}, index) => {
                    const isLast = index === tips.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={id}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={restaurant_id?.logo}
                              alt={restaurant_id?.restaurant_name}
                              size="sm"
                            />
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal">
                                {restaurant_id?.restaurant_name}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal">
                            {!restaurant_id?.is_tip_percentage &&
                              WEB_CONFIG.currencySymbol}
                            {amount.toFixed(2)}{" "}
                            {restaurant_id?.is_tip_percentage ? " %" : ""}
                          </Typography>
                        </td>

                        <td className={`${classes} w-28`}>
                          <Tooltip content="Edit Tips">
                            <IconButton
                              variant="text"
                              onClick={() => handleOpenUpdateTips({id, amount})}>
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Delete Tips">
                            <IconButton
                              onClick={() => handleDeleteButtonClick(id)}
                              variant="text">
                              <TrashIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
      <AddTips
        open={open}
        handleOpen={handleOpen}
        loading={loading}
        onAddTips={handleAddTips}
      />

      <DeleteTips
        open={openDeleteTips}
        handleOpen={handleOpenDeleteTips}
        loading={loading}
        handleSubmit={handleSubmit}
      />

      <UpdateTips
        openAddTips={openAddTips}
        handleOpen={handleOpenUpdateTips}
        selectedTips={selectedTips}
        loading={loading}
        onConfirm={handleConfirmUpdate}
      />
    </div>
  );
}
