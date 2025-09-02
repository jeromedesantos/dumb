import { type Product } from "../types/product";

export async function fetchProduct(search: string): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const products = [
        {
          id: 1,
          name: "Wasser",
          price: 10000,
          isReady: true,
        },
        {
          id: 2,
          name: "Kekse",
          price: 10000,
          isReady: true,
        },
        {
          id: 3,
          name: "Tee",
          price: 10000,
          isReady: true,
        },
        {
          id: 4,
          name: "Kaffe",
          price: 10000,
          isReady: true,
        },
        {
          id: 5,
          name: "Zucker",
          price: 10000,
          isReady: true,
        },
        {
          id: 6,
          name: "Milch",
          price: 10000,
          isReady: true,
        },
        {
          id: 7,
          name: "Banane",
          price: 10000,
          isReady: true,
        },
        {
          id: 8,
          name: "Brot",
          price: 10000,
          isReady: true,
        },
        {
          id: 9,
          name: "Apfel",
          price: 10000,
          isReady: true,
        },
        {
          id: 10,
          name: "Traube",
          price: 10000,
          isReady: true,
        },
      ];

      const filteredProduct = products.filter((product) => {
        if (
          product.name
            .trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase())
        ) {
          return product;
        }
      });
      if (filteredProduct.length === 0) {
        reject(new Error("Data not Found"));
        return;
      }
      resolve(filteredProduct);
    }, 1000);
  });
}
