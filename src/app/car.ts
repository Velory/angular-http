export class Car {
  private _name: string;
  private _color: string;
  private _id: number;


  set name(value: string) {
    this._name = value;
  }

  set color(value: string) {
    this._color = value;
  }

  set id(value: number) {
    this._id = value;
  }
}
