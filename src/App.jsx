import { Toaster } from "react-hot-toast";
import QueryProvider from "./provider/QueryProvider";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <QueryProvider>
      <Toaster
        containerStyle={{ zIndex: 99999 }}
        toastOptions={{
          duration: 3000,
          style: {
            zIndex: "99999999999999",
          },
        }}
        position="top-right"
        style={{
          zIndex: "99999999999999",
        }}
      />

      <AppRoutes />
    </QueryProvider>
  );
}

export default App;
