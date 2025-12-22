import { AdminProvider } from "./AdminContext";
import { AuthProvider } from "./AuthContext";
import { ListCarProvider } from "./ListCarContext";
import { OrdersProvider } from "./OrdersContext";

const AppProviders = ({ children, url }) => {
  return (
    <OrdersProvider url={url}>
      <ListCarProvider url={url}>
        {/* <AdminProvider> */}
        {/* <AuthProvider> */}
        {children}
        {/* </AuthProvider> */}
        {/* </AdminProvider> */}
      </ListCarProvider>
    </OrdersProvider>
  );
};

export default AppProviders;
