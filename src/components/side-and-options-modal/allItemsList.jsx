import React, {useEffect} from "react";
import {Drawer, IconButton, Typography} from "@material-tailwind/react";
import {Salad, Utensils, HandPlatter} from "lucide-react";
import {GroupItemList} from "./groupItemList";

export default function AllItemsList({open, closeDrawer, selectedGroupId, data}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const filteredData = data.filter(
    (item) =>
      item.food_sides?.some((side) => side.group_id === selectedGroupId) ||
      item.additional_sides?.some((side) => side.group_id === selectedGroupId) ||
      item.food_quantity?.some((quantity) => quantity.group_id === selectedGroupId) ||
      item.quick_instructions?.some(
        (instruction) => instruction.group_id === selectedGroupId,
      ),
  );

  console.log("object", filteredData);
  return (
    <>
      <Drawer
        overlay={true}
        overlayProps={{
          className: "fixed inset-0 h-full",
        }}
        size={500}
        placement="right"
        open={open}
        onClose={closeDrawer}
        className="p-4 overflow-y-scroll">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Group Items
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        <div className="w-full">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id}>
                <Typography variant="h6" color="blue-gray">
                  {item.title}
                </Typography>
                <GroupItemList items={item.food_sides} icon={Salad} title="Food Sides" />
                <GroupItemList
                  items={item.additional_sides}
                  icon={Salad}
                  title="Additional Sides"
                />
                <GroupItemList
                  items={item.quick_instructions}
                  icon={Utensils}
                  title="Quick Instructions"
                />
                <GroupItemList
                  items={item.food_quantity}
                  icon={HandPlatter}
                  title="Quantity"
                />
              </div>
            ))
          ) : (
            <Typography color="gray" variant="paragraph" className="font-medium">
              No items available for this group.
            </Typography>
          )}
        </div>
      </Drawer>
    </>
  );
}
