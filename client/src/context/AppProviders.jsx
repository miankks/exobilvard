import AuthProvider from "./AuthContext";
import CarProvider from "./CarContext";
import CartProvider from "./CartContext";
import CommentProvider from "./CommentContext";

const AppProviders = ({ children }) => {
  return (
    <CarProvider>
      <CartProvider>
        <CommentProvider>
          <AuthProvider>{children}</AuthProvider>
        </CommentProvider>
      </CartProvider>
    </CarProvider>
  );
};

export default AppProviders;
