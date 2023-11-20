import { BoardStatus } from '../boards.enum';

export class UpdateBoardDto {
  title?: string;
  description?: string;
  status?: BoardStatus;
}
