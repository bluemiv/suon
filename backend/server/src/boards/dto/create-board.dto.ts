import { IsString } from 'class-validator';
import { BoardStatus } from '../boards.model';

export class CreateBoardDto {
  @IsString()
  title: string;
  description: string;
  status?: BoardStatus;
}
