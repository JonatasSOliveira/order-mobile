import BaseModel, { ColumnsMappingType } from "../services/sqlite/BaseModel";

export default class Neighborhood extends BaseModel {
  private name: string = "";

  public static get tableName(): string {
    return "neighborhood";
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
