import { IsEmail, IsOptional, IsString } from 'class-validator';

export class createUserDTO {
  @IsString()
  @IsEmail()
  public email!: string;

  @IsString()
  public password!: string;

  @IsString()
  public firstname!: string;

  @IsString()
  public lastname!: string;

  @IsString()
  public phonenumber!: string;
}

export class loginUserDTO {
  @IsString()
  public email!: string;

  @IsString()
  public password!: string;
}
