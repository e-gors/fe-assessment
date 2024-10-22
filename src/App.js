import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes/routes";
import Private from "./routes/Private";
import Public from "./routes/Public";
import NotFound from "./routes/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, i) => {
          if (route.auth) {
            return (
              <Route
                key={i}
                path={route.path}
                element={<Private component={route.component} />}
              />
            );
          } else {
            return (
              <Route
                key={i}
                path={route.path}
                element={<Public component={route.component} />}
              />
            );
          }
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
