// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { CartProvider } from "@/context/CartContext";
// import { AuthProvider } from "@/context/AuthContext";
// import { OrderProvider } from "@/context/OrderContext";
// import Index from "./pages/Index";
// import Compare from "./pages/Compare";
// import Cart from "./pages/Cart";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Tracking from "./pages/Tracking";
// import MyOrders from "./pages/MyOrders";
// import AdminDashboard from "./pages/AdminDashboard";
// import NotFound from "./pages/NotFound";
// import ProtectedRoute from "./components/ProtectedRoute";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <AuthProvider>
//         <CartProvider>
//           <OrderProvider>
//             <Toaster />
//             <Sonner />
//             <BrowserRouter>
//               <ProtectedRoute>
//                 <Routes>
//                   <Route path="/" element={<Index />} />
//                   <Route path="/compare" element={<Compare />} />
//                   <Route path="/cart" element={<Cart />} />
//                   <Route path="/login" element={<Login />} />
//                   <Route path="/register" element={<Register />} />
//                   <Route path="/tracking" element={<Tracking />} />
//                   <Route path="/my-orders" element={<MyOrders />} />
//                   <Route path="/admin" element={<AdminDashboard />} />
//                   <Route path="*" element={<NotFound />} />
//                 </Routes>
//               </ProtectedRoute>
//             </BrowserRouter>
//           </OrderProvider>
//         </CartProvider>
//       </AuthProvider>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { OrderProvider } from "@/context/OrderContext";

import Index from "./pages/Index";
import Compare from "./pages/Compare";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tracking from "./pages/Tracking";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import PublicRoute from "./components/PublicRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <Toaster />
            <Sonner />

            <BrowserRouter>
              <Routes>

                {/* 🌐 Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/tracking" element={<Tracking />} />

                {/* 🚫 Only for NOT logged-in users */}
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PublicRoute>
                      <Register />
                    </PublicRoute>
                  }
                />

                {/* 🔐 Protected routes */}
                <Route
                  path="/my-orders"
                  element={
                    <ProtectedRoute>
                      <MyOrders />
                    </ProtectedRoute>
                  }
                />

                {/* 👑 Admin only */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />

                {/* ❌ 404 */}
                <Route path="*" element={<NotFound />} />

              </Routes>
            </BrowserRouter>

          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
