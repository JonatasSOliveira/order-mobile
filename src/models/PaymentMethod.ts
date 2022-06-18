import BaseModel, {
  BaseModelObj,
  ColumnsMappingType,
} from "../services/BaseModel";

interface PaymentMethodObj extends BaseModelObj {
  name: string;
}

export default class PaymentMethod extends BaseModel {
  private name: string = "";

  constructor(paymentMethod?: PaymentMethodObj) {
    super(paymentMethod);
    if (paymentMethod) {
      this.name = paymentMethod.name;
    }
  }

  static get tableName(): string {
    return "payment_methods";
  }

  static get columnsMapping(): ColumnsMappingType {
    return {
      name: {
        type: "TEXT",
        required: true,
      },
    };
  }

  static async getAll(): Promise<PaymentMethod[]> {
    const paymentMethodsObj = await super.findAll<PaymentMethodObj>();
    const paymentMethods: PaymentMethod[] = paymentMethodsObj.map(
      (paymentMethodsObj) => new PaymentMethod(paymentMethodsObj)
    );

    return paymentMethods;
  }

  setName(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  async save(): Promise<void> {
    const valuesToSave = {
      name: this.name.trim().toUpperCase(),
    };

    await super.save(PaymentMethod.tableName, valuesToSave);
  }
}
