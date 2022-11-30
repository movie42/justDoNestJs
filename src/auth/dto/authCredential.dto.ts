import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(7)
  @Matches(/^[a-zA-Z0-9\\d`~!@#$%^&*()-_=+]*$/, {
    message: "passowrd only accepts english and number and `~!@#$%^&*()-_=+"
  })
  password: string;
}
