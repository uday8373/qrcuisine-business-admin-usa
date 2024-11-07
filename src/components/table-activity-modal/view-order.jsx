import React, {useEffect, useState} from "react";
import {Drawer, Typography, Chip, Avatar, IconButton} from "@material-tailwind/react";
import moment from "moment";
import {WEB_CONFIG} from "@/configs/website-config";
import {
  Additional_Sides,
  Quantity,
  Quick_Instructions,
  Sides,
  Temperature,
} from "/public/img";
import IsCustomizedFood from "../food-modal/is-customized-food";
import supabase from "@/configs/supabase";

export default function ViewOrder({
  open,
  closeDrawer,
  selectedOrderId,
  orderTable,
  isSubOrder,
}) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [mergedArr, setMergedArr] = useState([]);
  const [subOrderData, setSubOrderData] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const restaurantId = localStorage.getItem("restaurants_id");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  // Fetch sub-orders and combine with main orders
  useEffect(() => {
    const fetchSubOrders = async () => {
      if (restaurantId) {
        const {data, error} = await supabase
          .from("sub_orders")
          .select("*")
          .eq("restaurant_id", restaurantId);

        if (!error && Array.isArray(data)) {
          setSubOrderData(data);
        } else {
          console.error("Error fetching sub-orders:", error);
          setSubOrderData([]);
        }
      }
    };

    fetchSubOrders();

    const channel = supabase
      .channel("sub_orders_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "sub_orders",
          filter: `restaurant_id=eq.${restaurantId}`,
        },
        (payload) => {
          const {new: newOrder, old: oldOrder, eventType} = payload;
          setSubOrderData((prev) =>
            eventType === "INSERT"
              ? [...prev, newOrder]
              : eventType === "UPDATE"
              ? prev.map((order) => (order.id === newOrder.id ? newOrder : order))
              : prev.filter((order) => order.id !== oldOrder.id),
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [restaurantId]);

  // Merge main orders and sub-orders into `allOrders`
  useEffect(() => {
    const mainOrders = orderTable?.flatMap((group) => group.orders) || [];
    const combinedOrders = [...mainOrders, ...subOrderData];
    setAllOrders(combinedOrders);
  }, [orderTable, subOrderData]);

  // Set selected order from `allOrders`
  useEffect(() => {
    const matchedOrder = allOrders.find((order) => order.id === selectedOrderId);
    setSelectedOrder(matchedOrder || null);

    if (matchedOrder) {
      const icons = {
        selectedSides: Sides,
        selectedAdditionalSides: Additional_Sides,
        selectedInstructions: Quick_Instructions,
        selectedTemperature: Temperature,
        selectedQuantity: Quantity,
      };
      const mergedItems = matchedOrder?.fooditem_ids?.map((item) => {
        const matchedIcon = {
          ...(item.selectedSides && {selectedSides: icons.selectedSides}),
          ...(item.selectedAdditionalSides && {
            selectedAdditionalSides: icons.selectedAdditionalSides,
          }),
          ...(item.selectedInstructions && {
            selectedInstructions: icons.selectedInstructions,
          }),
          ...(item.selectedTemperature && {
            selectedTemperature: icons.selectedTemperature,
          }),
          ...(item.selectedQuantity && {selectedQuantity: icons.selectedQuantity}),
        };
        return {...item, icon: matchedIcon};
      });
      setMergedArr(mergedItems || []);
    }
  }, [selectedOrderId, allOrders]);

  return (
    <Drawer
      overlay
      overlayProps={{className: "fixed inset-0 h-full"}}
      size={500}
      placement="right"
      open={open}
      onClose={closeDrawer}
      className="p-4 overflow-y-scroll">
      <div className="mb-6 flex items-center justify-between">
        {selectedOrder && (
          <Typography variant="h5" color="blue-gray">
            Order ID : {selectedOrder.order_id && selectedOrder.sub_order_id}
          </Typography>
        )}
        <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </IconButton>
      </div>

      {selectedOrder ? (
        <div className="w-full h-full">
          <div className="flex justify-between gap-3 items-center">
            <div className="flex flex-col gap-1">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-70">
                Created at
              </Typography>
              <div className="flex gap-1">
                <Typography variant="paragraph" color="blue-gray" className="font-normal">
                  {moment(selectedOrder?.created_at).format("DD MMM YYYY")}
                </Typography>
                <Typography variant="paragraph" color="blue-gray" className="font-normal">
                  at {moment(selectedOrder?.created_at).format("hh:mm a")}
                </Typography>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-70">
                Delivered
              </Typography>
              <Chip
                color={selectedOrder?.is_delivered ? "green" : "gray"}
                className="flex justify-center"
                value={selectedOrder?.is_delivered ? "True" : "False"}
              />
            </div>
          </div>
          <hr className="my-5" />

          <div className="flex flex-col gap-1">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-70">
              Customer
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="font-normal">
              {selectedOrder?.user_id?.name || "User"}
            </Typography>
            <Typography variant="paragraph" color="blue" className="font-normal">
              +91{" "}
              {(selectedOrder?.user_id?.mobile || "000000000").replace(
                /\d(?=\d{4})/g,
                "*",
              )}
            </Typography>
          </div>
          <hr className="my-5" />

          <div className="flex flex-col gap-3">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-70">
              Items
            </Typography>
            <div className="flex flex-col gap-3">
              {mergedArr.map((food, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    food?.is_customized ? "bg-green-50 px-2 py-2 rounded-lg" : ""
                  }`}>
                  <div className="flex justify-between items-center gap-3">
                    <div className="flex gap-3 items-center">
                      <Avatar src={food?.image} variant="rounded" />
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-normal line-clamp-1">
                        {food?.food_name}
                      </Typography>
                    </div>
                    <div className="flex gap-6 items-center">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-normal">
                        x {food?.quantity}
                      </Typography>
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-normal">
                        {WEB_CONFIG?.currencySymbol}
                        {(food?.price * food?.quantity).toFixed(2)}
                      </Typography>
                    </div>
                  </div>

                  {food?.is_customized && (
                    <>
                      <hr className="my-2 border-gray-500 border-dashed" />
                      <div className="w-full h-full grid grid-cols-2 gap-5">
                        {Object.entries(food.icon).map(([key, icon]) => (
                          <IsCustomizedFood
                            key={key}
                            title={key.replace(/selected/g, "")}
                            icon={icon}
                            content={food[key]?.title}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          <hr className="my-5" />

          <div className="flex flex-col gap-1">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-70">
              Instructions
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="font-normal">
              {selectedOrder?.instructions || "No instructions"}
            </Typography>
          </div>
          <hr className="my-5" />
          <div className="flex flex-col gap-1 pb-5">
            <div className="flex justify-between gap-3">
              <Typography variant="paragraph" color="blue-gray" className="font-semibold">
                Total
              </Typography>
              <Typography variant="lead" color="green" className="font-semibold">
                {WEB_CONFIG?.currencySymbol}
                {selectedOrder?.total_amount.toFixed(2)}
              </Typography>
            </div>
          </div>
        </div>
      ) : (
        <Typography variant="h5" color="blue-gray">
          No order found
        </Typography>
      )}
    </Drawer>
  );
}
