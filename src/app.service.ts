import { Injectable } from '@nestjs/common';
import { PrismaService } from './lib/prisma.service';

@Injectable()
export class AppService {
  constructor(
    private prismaService: PrismaService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async main() {
    await this.prismaService.user.create({
      data: {
        name: 'Rich',
        email: 'hello@prisma.com',
        posts: {
          create: {
            title: 'My first post',
            body: 'Lots of really interesting stuff',
            slug: 'my-first-post',
          },
        },
      },
    })
  
    const allUsers = await this.prismaService.user.findMany({
      include: {
        posts: true,
      },
    })
    console.dir(allUsers, { depth: null })
  }
}
