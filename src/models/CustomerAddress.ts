import BaseModel, { ColumnsMappingType } from "../services/BaseModel";

import City from "./City";
import Neighborhood from "./Neighborhood";

export default class CustomerAddress extends BaseModel {
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
      neighborhood_id: {
        type: "INTEGER",
        required: true,
        references: {
          table: Neighborhood.tableName,
          column: "id",
        },
      },
      street: {
        type: "TEXT",
        required: true,
      },
      number: {
        type: "TEXT",
        required: false,
      },
      complement: {
        type: "TEXT",
        required: false,
      },
      reference_point: {
        type: "TEXT",
        required: false,
      },
    };
  }
}
