import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  QueueListIcon,
  CakeIcon,
  CubeIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  StarIcon,
  LightBulbIcon,
} from "@heroicons/react/24/solid";
import {Home, Profile, Tables, Category} from "@/pages/dashboard";
import {SignIn} from "@/pages/auth";
import {FoodItems} from "./pages/dashboard/fooditem";
import {Orders} from "./pages/dashboard/orders";
import {WaiterTable} from "./pages/dashboard/waiter";
import Settings from "./pages/dashboard/settings";
import TableGrid from "./pages/dashboard/table-grid";
import Ratings from "./pages/dashboard/ratings";
import Messages from "./pages/dashboard/messages";
import ActivityTable from "./pages/dashboard/activity-table";
import Tips from "./pages/dashboard/tips";
import SubCategory from "./pages/dashboard/sub-category";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      // {
      //   icon: <RectangleGroupIcon {...icon} />,
      //   name: "Table Grid",
      //   path: "/table-grid",
      //   element: <TableGrid />,
      // },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <QueueListIcon {...icon} />,
        name: "category",
        path: "/category",
        element: <Category />,
      },
      {
        icon: <QueueListIcon {...icon} />,
        name: "sub category",
        path: "/sub-category",
        element: <SubCategory />,
      },
      {
        icon: <CakeIcon {...icon} />,
        name: "food items",
        path: "/fooditems",
        element: <FoodItems />,
      },
      {
        icon: <CubeIcon {...icon} />,
        name: "orders",
        path: "/orders",
        element: <Orders />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "waiters",
        path: "/waiters",
        element: <WaiterTable />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Table Activity",
        path: "/table-activity",
        element: <ActivityTable />,
      },
      {
        icon: <StarIcon {...icon} />,
        name: "Ratings",
        path: "/ratings",
        element: <Ratings />,
      },
      {
        icon: <LightBulbIcon {...icon} />,
        name: "Tips",
        path: "/tips",
        element: <Tips />,
      },

      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "settings",
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
