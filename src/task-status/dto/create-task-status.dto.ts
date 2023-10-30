import { IsHexColor, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskStatusDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsHexColor() // O valor deverá ser uma cor HEX válida, selecionada no frontend.
  @IsNotEmpty()
  color: string;
}
