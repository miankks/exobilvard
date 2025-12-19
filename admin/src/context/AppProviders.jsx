import { AdminProvider } from "./AdminContext";
import { AuthProvider } from "./AuthContext";
import { OrdersProvider } from "./OrdersContext";

const AppProviders = ({ children }) => {
  return (
    <OrdersProvider>
      {/* <AdminProvider> */}
      {/* <AuthProvider> */}
      {children}
      {/* </AuthProvider> */}
      {/* </AdminProvider> */}
    </OrdersProvider>
  );
};

export default AppProviders;
