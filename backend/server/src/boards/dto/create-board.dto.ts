import { IsString } from 'class-validator';
import { BoardStatus } from '../boards.enum';

export class CreateBoardDto {
  @IsString()
  title: string;
  description: string;
  status?: BoardStatus;
}
