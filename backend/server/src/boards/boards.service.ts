import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './boards.enum';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardsRepository } from './boards.repository';
import { Boards } from './boards.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Boards)
    private boardsRepository: BoardsRepository,
  ) {}

  /**
   * 전체 게시글을 가지고 옴
   */
  getAllBoards() {
    return this.boardsRepository.find();
  }

  /**
   * 특정 게시글을 가지고 옴
   * @param id
   */
  async getBoardById(id: number): Promise<Boards> {
    const board = await this.boardsRepository.findOne({ where: { id } });
    if (!board) throw new NotFoundException(`Can't found board. id: ${id}`);
    return board;
  }

  /**
   * 게시글을 생성
   * @param createBoardDto
   */
  async createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board = this.boardsRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.boardsRepository.save(board);
    return board;
  }

  /**
   * 게시글을 삭제
   * @param id 게시글의 id 값
   */
  async deleteBoard(id: number) {
    const { affected } = await this.boardsRepository.delete(id);
    if (affected === 0) {
      throw new NotFoundException(`Can't found board for delete. id: ${id}`);
    }
  }

  /**
   * 게시글을 업데이트
   * @param id 게시글의 id
   * @param updateBoardDto 업데이트 요청의 DTO
   */
  async updateBoard(id: number, updateBoardDto: UpdateBoardDto) {
    const board = await this.getBoardById(id);
    const nextBoard = {
      ...board,
      ...Object.entries(updateBoardDto).reduce((acc, board) => {
        const [key, value] = board;
        if (value === null || value === undefined) return acc;
        return { ...acc, [key]: value };
      }, {}),
    };
    await this.boardsRepository.update(id, nextBoard);
    return nextBoard;
  }
}
