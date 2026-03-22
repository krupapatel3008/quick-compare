import api from "./axios";

// 🛒 GET ALL PRODUCTS
export const getGroceries = async () => {
  try {
    const res = await api.get("/groceries");
    return res.data;
  } catch (err) {
    console.error("Error fetching groceries:", err);
    return [];
  }
};

// ➕ ADD PRODUCT
export const addGrocery = async (productData) => {
  try {
    const res = await api.post("/groceries", productData);
    return res.data;
  } catch (err) {
    console.error("Error adding product:", err);
    throw err;
  }
};

// ❌ DELETE PRODUCT
export const deleteGrocery = async (id) => {
  try {
    const res = await api.delete(`/groceries/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting product:", err);
    throw err;
  }
};

// ✏️ UPDATE PRODUCT (optional but useful)
export const updateGrocery = async (id, updatedData) => {
  try {
    const res = await api.put(`/groceries/${id}`, updatedData);
    return res.data;
  } catch (err) {
    console.error("Error updating product:", err);
    throw err;
  }
};