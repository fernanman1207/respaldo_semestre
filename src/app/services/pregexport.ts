export class Pregunta {
    private _id_preg: number | undefined;
  pregunta: any;
  public get id_preg(): number | undefined {
    return this._id_preg;
  }
  public set id_preg(value: number | undefined) {
    this._id_preg = value;
  }
    pregunta_secreta!: string;
  }
  