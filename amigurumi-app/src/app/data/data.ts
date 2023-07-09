
import { Product } from "../types/product";
import { data } from "./seed";

export class ProductData {
  getData(): Product[] {
    let products: Product[] = [];

    for (let i = 0; i < data.length; i++) {
      const title = data[i].title || ''; // Проверяваме и задаваме стойност по подразбиране, ако title е undefined
      const description = data[i].description || '';
      const author = data[i].author || '';
      const imageUrl = data[i].imageUrl || '';
      const skillLevel = data[i].skillLevel || '';
      const id = Number(data[i].id) || 0;

      products[i] = new Product(author, description, id, imageUrl, skillLevel, title);
    }

    return products;
  }
  getProductId(id: number): Product | undefined {
    const product = data.find(item => item.id === id);

    if (product) {
      const { author, description, id, imageUrl, skillLevel, title } = product;
      return new Product(author, description, id, imageUrl, skillLevel, title);
    }

    return undefined;
  }

}

