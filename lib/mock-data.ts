import {
  LatestSale,
  OrderStatus,
  Product,
  Sale,
  SaleItem,
} from "@/models/product";

export interface Order {
  id: string;
  customer: string;
  phone: string;
  items: SaleItem[];
  total: number;
  status: OrderStatus;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

// Inventory products
export const products: Product[] = [
  {
    id: "1",
    name: "Película Samsung A32",
    price: 25,
    stock_qty: 2,
    min_stock_qty: 5,
    category: "Películas",
  },
  {
    id: "2",
    name: "Cabo Type-C 1m",
    price: 20,
    stock_qty: 1,
    min_stock_qty: 6,
    category: "Cabos",
  },
  {
    id: "3",
    name: "Capinha iPhone 11",
    price: 35,
    stock_qty: 10,
    min_stock_qty: 3,
    category: "Capinhas",
  },
  {
    id: "4",
    name: "Carregador USB 20W",
    price: 45,
    stock_qty: 8,
    min_stock_qty: 4,
    category: "Carregadores",
  },
  {
    id: "5",
    name: "Smartwatch D20",
    price: 89,
    stock_qty: 3,
    min_stock_qty: 2,
    category: "Smartwatch",
  },
  {
    id: "6",
    name: "Película iPhone 13",
    price: 30,
    stock_qty: 0,
    min_stock_qty: 5,
    category: "Películas",
  },
  {
    id: "7",
    name: "Cabo Lightning 1m",
    price: 25,
    stock_qty: 4,
    min_stock_qty: 6,
    category: "Cabos",
  },
  {
    id: "8",
    name: "Capinha Samsung A54",
    price: 30,
    stock_qty: 12,
    min_stock_qty: 5,
    category: "Capinhas",
  },
  {
    id: "9",
    name: "Fone Bluetooth TWS",
    price: 65,
    stock_qty: 0,
    min_stock_qty: 3,
    category: "Fones",
  },
  {
    id: "10",
    name: "Carregador Veicular",
    price: 35,
    stock_qty: 6,
    min_stock_qty: 4,
    category: "Carregadores",
  },
];

// All recorded sales transactions
export const sales: Sale[] = [
  {
    id: "v1",
    items: [
      {
        id: "si1",
        sale_id: "v1",
        product_id: "1", // Película Samsung A32
        product_name: "Película Samsung A32",
        qty: 2,
        unit_price: 25,
        total: 50,
      },
    ],
    total: 50,
    paymentMethod: "pix",
    payment_method: "pix",
    time: "09:15",
    date: new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "v2",
    items: [
      {
        id: "si2",
        sale_id: "v2",
        product_id: "3",
        product_name: "Capinha iPhone 11",
        qty: 1,
        unit_price: 35,
        total: 35,
      },
      {
        id: "si3",
        sale_id: "v2",
        product_id: "2",
        product_name: "Cabo Type-C 1m",
        qty: 1,
        unit_price: 20,
        total: 20,
      },
    ],
    total: 55,
    paymentMethod: "card",
    payment_method: "card",
    time: "10:30",
    date: new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "v3",
    items: [
      {
        id: "si4",
        sale_id: "v3",
        product_id: "4",
        product_name: "Carregador USB 20W",
        qty: 1,
        unit_price: 45,
        total: 45,
      },
    ],
    total: 45,
    paymentMethod: "cash",
    payment_method: "cash",
    time: "11:45",
    date: new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "v4",
    items: [
      {
        id: "si5",
        sale_id: "v4",
        product_id: "5",
        product_name: "Smartwatch D20",
        qty: 2,
        unit_price: 89,
        total: 178,
      },
    ],
    total: 178,
    paymentMethod: "pix",
    payment_method: "pix",
    time: "14:20",
    date: new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "v5",
    items: [
      {
        id: "si6",
        sale_id: "v5",
        product_id: "8",
        product_name: "Capinha Samsung A54",
        qty: 3,
        unit_price: 30,
        total: 90,
      },
    ],
    total: 90,
    paymentMethod: "pix",
    payment_method: "pix",
    time: "15:10",
    date: new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "v6",
    items: [
      {
        id: "si7",
        sale_id: "v6",
        product_id: "10",
        product_name: "Carregador Veicular",
        qty: 1,
        unit_price: 35,
        total: 35,
      },
    ],
    total: 35,
    paymentMethod: "cash",
    payment_method: "cash",
    time: "16:00",
    date: new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "v7",
    items: [
      {
        id: "si8",
        sale_id: "v7",
        product_id: "7",
        product_name: "Cabo Lightning 1m",
        qty: 2,
        unit_price: 25,
        total: 50,
      },
      {
        id: "si9",
        sale_id: "v7",
        product_id: "1",
        product_name: "Película Samsung A32",
        qty: 1,
        unit_price: 25,
        total: 25,
      },
    ],
    total: 75,
    paymentMethod: "pix",
    payment_method: "pix",
    time: "16:45",
    date: new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "v8",
    items: [
      {
        id: "si10",
        sale_id: "v8",
        product_id: "3",
        product_name: "Capinha iPhone 11",
        qty: 2,
        unit_price: 35,
        total: 70,
      },
    ],
    total: 70,
    paymentMethod: "pix",
    payment_method: "pix",
    time: "17:30",
    date: new Date().toISOString().split("T")[0],
    created_at: "2024-01-16T00:00:00.000Z",
    updated_at: "2024-01-16T00:00:00.000Z",
    out_of_stock: false,
  },
  {
    id: "v9",
    items: [
      {
        id: "si11",
        sale_id: "v9",
        product_id: "4",
        product_name: "Carregador USB 20W",
        qty: 1,
        unit_price: 45,
        total: 45,
      },
    ],
    total: 45,
    paymentMethod: "pix",
    payment_method: "pix",
    time: "18:00",
    date: new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "v10",
    items: [
      {
        id: "si12",
        sale_id: "v10",
        product_id: "2",
        product_name: "Cabo Type-C 1m",
        qty: 1,
        unit_price: 20,
        total: 20,
      },
    ],
    total: 20,
    paymentMethod: "cash",
    payment_method: "cash",
    time: "18:30",
    date: new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "v11",
    items: [
      {
        id: "si13",
        sale_id: "v11",
        product_id: "8",
        product_name: "Capinha Samsung A54",
        qty: 1,
        unit_price: 30,
        total: 30,
      },
    ],
    total: 30,
    paymentMethod: "pix",
    payment_method: "pix",
    time: "19:00",
    date: new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "v12",
    items: [
      {
        id: "si14",
        sale_id: "v12",
        product_id: "5",
        product_name: "Smartwatch D20",
        qty: 1,
        unit_price: 89,
        total: 89,
      },
    ],
    total: 89,
    paymentMethod: "pix",
    payment_method: "pix",
    time: "19:30",
    date: new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// A subset of sales for quick UI components (latest sales)
export const LATEST_SALES: LatestSale[] = [
  {
    id: 1,
    product: "Smartwatch D20",
    price: 89,
    time: "19:30",
    payment: "Pix",
  },
  {
    id: 2,
    product: "Capinha Samsung A54",
    price: 30,
    time: "19:00",
    payment: "Pix",
  },
  {
    id: 3,
    product: "Cabo Type-C 1m",
    price: 20,
    time: "18:30",
    payment: "Dinheiro",
  },
];

// Active orders (encomendas)
export const orders: Order[] = [
  {
    id: "e1",
    customer: "Maria Silva",
    phone: "(11) 99999-1111",
    items: [
      {
        id: "oi1",
        sale_id: "e1",
        product_id: "6",
        product_name: "Película iPhone 13",
        qty: 2,
        unit_price: 30,
        total: 60,
      },
    ],
    total: 60,
    status: "pending",
    note: "Cliente vai buscar sexta-feira",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "e2",
    customer: "João Santos",
    phone: "(11) 98888-2222",
    items: [
      {
        id: "oi2",
        sale_id: "e2",
        product_id: "9",
        product_name: "Fone Bluetooth TWS",
        qty: 1,
        unit_price: 65,
        total: 65,
      },
    ],
    total: 65,
    status: "arrived",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-16",
  },
  {
    id: "e3",
    customer: "Ana Oliveira",
    phone: "(11) 97777-3333",
    items: [
      {
        id: "oi3",
        sale_id: "e3",
        product_id: "3",
        product_name: "Capinha iPhone 11",
        qty: 1,
        unit_price: 35,
        total: 35,
      },
      {
        id: "oi4",
        sale_id: "e3",
        product_id: "1",
        product_name: "Película Samsung A32",
        qty: 1,
        unit_price: 25,
        total: 25,
      },
    ],
    total: 60,
    status: "pending",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-16",
  },
  {
    id: "e4",
    customer: "Carlos Ferreira",
    phone: "(11) 96666-4444",
    items: [
      {
        id: "oi5",
        sale_id: "e4",
        product_id: "5",
        product_name: "Smartwatch D20",
        qty: 1,
        unit_price: 89,
        total: 89,
      },
    ],
    total: 89,
    status: "separated",
    note: "Presente de aniversário",
    createdAt: "2024-01-13",
    updatedAt: "2024-01-16",
  },
  {
    id: "e5",
    customer: "Lucia Mendes",
    phone: "(11) 95555-5555",
    items: [
      {
        id: "oi6",
        sale_id: "e5",
        product_id: "7",
        product_name: "Cabo Lightning 1m",
        qty: 3,
        unit_price: 25,
        total: 75,
      },
    ],
    total: 75,
    status: "pending",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-16",
  },
  {
    id: "e6",
    customer: "Pedro Costa",
    phone: "(11) 94444-6666",
    items: [
      {
        id: "oi7",
        sale_id: "e6",
        product_id: "4",
        product_name: "Carregador USB 20W",
        qty: 2,
        unit_price: 45,
        total: 90,
      },
    ],
    total: 90,
    status: "arrived",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-15",
  },
  {
    id: "e7",
    customer: "Fernanda Lima",
    phone: "(11) 93333-7777",
    items: [
      {
        id: "oi8",
        sale_id: "e7",
        product_id: "8",
        product_name: "Capinha Samsung A54",
        qty: 2,
        unit_price: 30,
        total: 60,
      },
    ],
    total: 60,
    status: "pending",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-16",
  },
  {
    id: "e8",
    customer: "Roberto Alves",
    phone: "(11) 92222-8888",
    items: [
      {
        id: "oi9",
        sale_id: "e8",
        product_id: "6",
        product_name: "Película iPhone 13",
        qty: 1,
        unit_price: 30,
        total: 30,
      },
    ],
    total: 30,
    status: "pending",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "e9",
    customer: "Mariana Souza",
    phone: "(11) 91111-9999",
    items: [
      {
        id: "oi10",
        sale_id: "e9",
        product_id: "9",
        product_name: "Fone Bluetooth TWS",
        qty: 2,
        unit_price: 65,
        total: 130,
      },
    ],
    total: 130,
    status: "pending",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-16",
  },
  {
    id: "e10",
    customer: "Bruno Martins",
    phone: "(11) 90000-0000",
    items: [
      {
        id: "oi11",
        sale_id: "e10",
        product_id: "2",
        product_name: "Cabo Type-C 1m",
        qty: 5,
        unit_price: 20,
        total: 100,
      },
    ],
    total: 100,
    status: "pending",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-16",
  },
];

// Computes a summary of today's sales.
export const getSalesSummary = () => {
  const today = new Date().toISOString().split("T")[0];
  const salesToday = sales.filter((s) => s.date === today);

  return {
    total: salesToday.reduce((acc, s) => acc + s.total, 0),
    quantity: salesToday.length,
    pix: salesToday.filter((s) => s.paymentMethod === "pix").length,
    cash: salesToday.filter((s) => s.paymentMethod === "cash").length,
    card: salesToday.filter((s) => s.paymentMethod === "card").length,
    totalPix: salesToday
      .filter((s) => s.paymentMethod === "pix")
      .reduce((acc, s) => acc + s.total, 0),
    totalCash: salesToday
      .filter((s) => s.paymentMethod === "cash")
      .reduce((acc, s) => acc + s.total, 0),
    totalCard: salesToday
      .filter((s) => s.paymentMethod === "card")
      .reduce((acc, s) => acc + s.total, 0),
  };
};

// Returns products at or below their minimum stock
export const getLowStockProducts = () => {
  return products.filter(
    (p) =>
      typeof p.min_stock_qty === "number" && p.stock_qty <= p.min_stock_qty,
  );
};

// Returns orders that are pending, arrived, or separated
export const getPendingOrders = () => {
  return orders.filter(
    (o) =>
      o.status === "pending" ||
      o.status === "arrived" ||
      o.status === "delivered" ||
      o.status === "cancelled" ||
      o.status === "separated",
  );
};
