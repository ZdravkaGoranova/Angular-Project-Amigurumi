import { Product} from "../models/product.model";
import { data } from "./seed";

export class ProductData {
    getData(): Product[] {
        let products: Product[] = [];
    
        for (let i = 0; i < data.length; i++) {
          const title = data[i].title || ''; // Проверяваме и задаваме стойност по подразбиране, ако title е undefined
          const description = data[i].description || '';
          const author = data[i].author || '';
          const imageUrl = data[i].imageUrl || '';
    
          products[i] = new Product(title, description, author, imageUrl);
        }
    
        return products;
      }
}

