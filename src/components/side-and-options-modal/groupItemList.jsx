import React from "react";
import {List, ListItem, ListItemPrefix, Typography} from "@material-tailwind/react";
import {WEB_CONFIG} from "@/configs/website-config";
export const GroupItemList = ({items, icon: Icon, title}) => (
  <div>
    {items.length > 0 && (
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemPrefix>
              <Icon />
            </ListItemPrefix>
            <div className="flex w-full justify-between items-center">
              <Typography variant="small" color="gray" className="font-normal">
                {item.title}
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="font-normal whitespace-nowrap">
                {item.price > 0
                  ? `${WEB_CONFIG.currencySymbol} ${item.price?.toFixed(2)}`
                  : ""}
              </Typography>
            </div>
          </ListItem>
        ))}
      </List>
    )}
  </div>
);
