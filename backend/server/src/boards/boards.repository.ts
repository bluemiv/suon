import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Boards } from './boards.entity';

@Injectable()
export class BoardsRepository extends Repository<Boards> {}
