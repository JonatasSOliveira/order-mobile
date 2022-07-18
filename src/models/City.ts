import BaseModel, { ColumnsMappingType } from "../services/BaseModel";

export default class City extends BaseModel {
  private name: string = "";

  public static get tableName(): string {
    return "city";
  }

  protected static get columnsMapping(): ColumnsMappingType {
    return {
      name: {
        type: "TEXT",
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
}
