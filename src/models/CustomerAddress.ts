import BaseModel, { ColumnsMappingType } from "../services/BaseModel";
import City from "./City";

export default class Customer extends BaseModel {
  public static get tableName(): string {
    return "customer";
  }

  protected static get columnsMapping(): ColumnsMappingType {
    return {
      city_id: {
        type: "INTEGER",
        required: true,
        references: {
          table: City.tableName,
          column: "id",
        },
      },
    };
  }
}
