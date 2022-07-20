import BaseModel, { ColumnsMappingType } from "../services/sqlite/BaseModel";

export default class Product extends BaseModel {
  private name: string = "";
  private description: string = "";
  private price: number = 0;

  protected static get tableName(): string {
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
}
