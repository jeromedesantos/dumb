interface Order {
  no: number;
  product_id: string[];
  qty: number;
  sum: number;
}

const orders: Order[] = [
  {
    no: 1,
    product_id: ["CD-1", "CD-2"],
    qty: 2,
    sum: 600,
  },
];

export { Order, orders };
