import BaseModel, {
  BaseModelObj,
  ColumnsMappingType,
} from "../services/sqlite/BaseModel";

interface ProductObj extends BaseModelObj {
  name: string;
  price: number;
  description: string | null;
}

export default class Product extends BaseModel {
  private name: string = "";
  private description: string | null = null;
  private price: number = 0;

  constructor(product?: ProductObj) {
    super(product);
    if (product) {
      this.name = product.name;
      this.description = product.description;
      this.price = product.price;
    }
  }

  public static get tableName(): string {
    return "product";
  }

  protected static get columnsMapping(): ColumnsMappingType {
    return {
      name: {
        type: "TEXT",
        required: true,
      },
      description: {
        type: "TEXT",
        required: false,
      },
      price: {
        type: "NUMERIC",
        required: true,
      },
    };
  }

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getDescription() {
    return this.description;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public getPrice() {
    return this.price;
  }

  public setPrice(price: number) {
    this.price = price;
  }

  public static async getAll(): Promise<Product[]> {
    const productsObj = await super.findAll<ProductObj>();
    const products: Product[] = productsObj.map(
      (productObj) => new Product(productObj)
    );

    return products;
  }
}
