export class CustomerInputDto {
  constructor(
    public readonly name: string,
    public readonly initialAmount: number,
  ) {}
}
