import { createBrowserRouter } from "react-router";
import { Intro } from "./pages/Intro";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Scan } from "./pages/Scan";
import { ProductAnalysis } from "./pages/ProductAnalysis";
import { Comparison } from "./pages/Comparison";
import { Profile } from "./pages/Profile";
import { RecentScans } from "./pages/RecentScans";
import { SettingsPage } from "./pages/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Intro,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/home",
    Component: Home,
  },
  {
    path: "/scan",
    Component: Scan,
  },
  {
    path: "/product/:id",
    Component: ProductAnalysis,
  },
  {
    path: "/compare",
    Component: Comparison,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/recent-scans",
    Component: RecentScans,
  },
  {
    path: "/settings",
    Component: SettingsPage,
  },
  {
    path: "*",
    Component: Intro,
  },
]);