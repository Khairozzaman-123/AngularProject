export class Payment {
  constructor(
    public paymentId?: number,
    public pMonth?: Date,
    public memberId?: number,
    public pAmount?: number
  ) { }
}
