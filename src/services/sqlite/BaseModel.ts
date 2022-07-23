import moment from "moment";

import db from "./SQLiteDatabse";

export interface ColumnsMappingType {
  [key: string]: {
    type: "INTEGER" | "TEXT" | "BLOB" | "NUMERIC";
    required: boolean;
    references?: {
      table: string;
      column: string;
    };
  };
}

export interface ColumnsType {
  [key: string]: string | number;
}

export interface BaseModelObj {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export default class BaseModel {
  protected id: number = 0;

  protected constructor(values?: BaseModelObj) {
    if (values) {
      this.id = values.id;
    }
  }

  public static get tableName(): string {
    return "";
  }

  protected static get columnsMapping(): ColumnsMappingType {
    return {};
  }

  private static getColumns(): string {
    const columnsMapping = this.columnsMapping;

    const columnsNames = Object.keys(columnsMapping);
    const columnsArr: string[] = [];
    const foreignKeys: string[] = [];

    for (const key of columnsNames) {
      const nullDeclaration = columnsMapping[key].required
        ? "NOT NULL"
        : "NULL";
      const column = ` ${key} ${columnsMapping[key].type} ${nullDeclaration} `;

      columnsArr.push(column);

      const { references } = columnsMapping[key];
      if (references) {
        const { table, column } = references;
        foreignKeys.push(`FOREIGN KEY (${key}) REFERENCES ${table}(${column})`);
      }
    }

    let columns = `id INTEGER PRIMARY KEY AUTOINCREMENT
      ,created_at DATETIME NOT NULL
      ,updated_at DATETIME NOT NULL
      ,deleted_at DATETIME NULL`;

    if (columnsArr.length > 0) columns += `, ${columnsArr.join("\n,")}`;
    if (foreignKeys.length > 0) columns += `, ${foreignKeys.join("\n,")}`;

    return columns;
  }

  public getId() {
    return this.id;
  }

  public static createTable(): Promise<void> {
    const tableName = this.tableName;

    const sqlCreate = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        ${this.getColumns()}
      )
    `;

    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            sqlCreate,
            [],
            () => {
              resolve();
            },
            (tx, error) => {
              reject(error);
              return true;
            }
          );
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  private create(tableName: string, values: ColumnsType): Promise<void> {
    const nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
    const columnsNames: string[] = ["created_at", "updated_at"];
    const columnValues: string[] = [`"${nowDate}"`, `"${nowDate}"`];

    for (const key of Object.keys(values)) {
      columnsNames.push(key);
      columnValues.push(`"${values[key]}"`);
    }

    const insertSql = `
      INSERT INTO ${tableName} (${columnsNames.join(",")})
      VALUES (${columnValues.join(",")})
    `;

    return new Promise<void>((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(insertSql, undefined, () => {
            resolve();
          });
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  }

  private update(tableName: string, values: ColumnsType): Promise<void> {
    const nowDate = moment().format("YYYY-MM-DD HH:mm:ss");

    const columns: string[] = [];

    for (const key of Object.keys(values)) {
      columns.push(`${key} = "${values[key]}"`);
    }

    const updateSql = `
      UPDATE ${tableName}
      SET ${columns.join(",")}
        ,updated_at = "${nowDate}"
      WHERE id = ${this.id}
    `;

    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(updateSql, undefined, () => {
            resolve();
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  protected static findAll<T>(): Promise<T[]> {
    const tableName = this.tableName;
    const selectSql = `
      SELECT * FROM ${tableName}
    `;

    return new Promise<T[]>((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            selectSql,
            [],
            (tx, results) => {
              const rows = results.rows;
              const rowsLength = rows.length;
              const rowsData: T[] = [];

              for (let i = 0; i < rowsLength; i++) {
                const row = rows.item(i);
                rowsData.push(row);
              }

              resolve(rowsData);
            },
            (tx, error) => {
              reject(error);
              return true;
            }
          );
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  protected async save(tableName: string, values: ColumnsType): Promise<void> {
    if (this.id) {
      return await this.update(tableName, values);
    }
    return await this.create(tableName, values);
  }

  protected async delete(tableName: string): Promise<void> {
    const nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
    const values: ColumnsType = {
      deleted_at: nowDate,
    }

    await this.update(tableName, values);
  }
}
