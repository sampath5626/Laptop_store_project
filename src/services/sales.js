import api from "./api";

const LOCAL_SALES_KEY = "laptop-store-sales";

function getLocalSales() {
  try {
    const sales = JSON.parse(localStorage.getItem(LOCAL_SALES_KEY));
    return Array.isArray(sales) ? sales : [];
  } catch {
    return [];
  }
}

function saveLocalSales(sales) {
  localStorage.setItem(LOCAL_SALES_KEY, JSON.stringify(sales));
}

export async function createSale(sale) {
  try {
    const response = await api.post("/sales", sale);
    return response.data;
  } catch {
    const localSale = { ...sale, id: `local-${Date.now()}` };
    saveLocalSales([...getLocalSales(), localSale]);
    return localSale;
  }
}

export async function getSales() {
  try {
    const response = await api.get("/sales");
    return Array.isArray(response.data) ? response.data : getLocalSales();
  } catch {
    return getLocalSales();
  }
}