import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/lib/prisma.service";

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser() {
    
  }
}