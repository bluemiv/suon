import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './boards.model';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  private mockBoards = [];

  getAllBoards() {
    return this.mockBoards;
  }

  getBoardIdx(id: string) {
    const boardIdx = this.mockBoards.findIndex((board) => board.id === id);
    if (boardIdx === -1)
      throw new NotFoundException(`Can't found board. id: ${id}`);
    return boardIdx;
  }

  getBoard(id: string) {
    const boardIdx = this.getBoardIdx(id);
    return this.mockBoards[boardIdx];
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.mockBoards.push(board);
    return board;
  }

  deleteBoard(id: string) {
    const boardIdx = this.getBoardIdx(id);
    this.mockBoards = [
      ...this.mockBoards.slice(0, boardIdx),
      ...this.mockBoards.slice(boardIdx + 1),
    ];
  }

  updateBoard(id: string, updateBoardDto: UpdateBoardDto) {
    const boardIdx = this.getBoardIdx(id);
    const nextBoard = {
      ...this.mockBoards[boardIdx],
      ...Object.entries(updateBoardDto).reduce((acc, board) => {
        const [key, value] = board;
        if (value === null || value === undefined) return acc;
        return { ...acc, [key]: value };
      }, {}),
    };
    this.mockBoards[boardIdx] = nextBoard;
    return nextBoard;
  }
}
