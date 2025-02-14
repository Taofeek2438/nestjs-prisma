import { PrismaClient, Validation } from '@prisma/client'
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { genToken } from 'src/helpers/genTokens'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        await this.$connect()
    }

    async onModuleDestroy() {
        await this.$disconnect()
    }
    async isTokenExpired(validation: Validation) {
        const isExpired = new Date() > new Date(validation.token_expiry)
        if (isExpired) {
            await this.validation.delete({
                where: {
                    token: validation.token
                }
            })

            return true
        }

        return false
    }

    async validateToken(recv_token: string, validation: Validation) {
        const decodedToken = atob(recv_token)
        const token = genToken(validation?.userId, validation?.randomCode)

        return token.token === decodedToken
    }
}