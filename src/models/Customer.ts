import BaseModel, { ColumnsMappingType } from "../services/sqlite/BaseModel";

export default class Customer extends BaseModel {
  private name: string = "";
  private federalDocument: string = "";

  public static get tableName(): string {
    return "customer";
  }

  protected static get columnsMapping(): ColumnsMappingType {
    return {
      name: {
        type: "TEXT",
        required: true,
      },
      federal_document: {
        type: "TEXT",
        required: false,
      },
    };
  }

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getFederalDocument() {
    return this.federalDocument;
  }

  public setFederalDocument(federalDocument: string) {
    this.federalDocument = federalDocument;
  }
}
