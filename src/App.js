import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./redux/store/store";
import Routes from "./routes/routes";
import { Provider as ReduxProvider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Routes />,
  },
]);

const App = () => {
  const helmetContext = {};
  return (
    <ReduxProvider store={store}>
      <HelmetProvider context={helmetContext}>
        <RouterProvider router={router} />
      </HelmetProvider>
    </ReduxProvider>
  );
};

export default App;
