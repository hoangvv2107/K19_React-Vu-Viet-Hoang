import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

// 1. Import các thành phần của MUI
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// font Inter
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import JobInfo from "./pages/jobInfo";
import CompanyDetail from "./pages/CompanyDetail";
import CreateCV from "./pages/createCV/CreateCV";
import PostJob from "./pages/PostJob";

const theme = createTheme({
  palette: {
    success: {
      main: "#009643",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/job-info",
    element: <JobInfo />,
  },
  {
    path: "/company-detail",
    element: <CompanyDetail />,
  },
  {
    path: "/tao-cv",
    element: <CreateCV />,
  },
  {
    path: "/dang-tuyen",
    element: <PostJob />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
