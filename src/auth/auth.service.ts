import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import getRandom from 'src/utils/getRandom';
import hash from 'src/utils/hash';
import { ConfigService } from '@nestjs/config';
import fileSystem from 'src/utils/fileSystem';
import { InjectRepository } from '@nestjs/typeorm';
import UsersEntity from 'src/entities/auth/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  /**
   * @param Authorization - Bearer 토큰 [알아서 split 해줌]
   * @returns 
   */
  public extractTokenFromHeader(Authorization: string): string | undefined {
    const [type, token] = Authorization?.split(' ') ?? [''];
    return type === 'Bearer' ? token : undefined;
  }

  /**
   * @param uuid - 유저 고유 uuid
   * @returns Repository<UserEntity>
   */
  async findOneById(id: string) {
    return await this.userRepository.findOne({
      where: { uuid: id }
    })
  }

  /**
   * @param username - 아이디
   * @returns Repository<UserEntity>
   */
  async findOneByUsername(username: string) {
    return await this.userRepository.findOne({
      where: { username }
    })
  }

  async findOneByToken(token: string) {
    return await this.userRepository.findOne({
      where: { uuid: (await this.verifyToken(token)).payload }
    })
  }

  /**
   * @param username - 아이디
   * @param password - 비밀번호
   * @param name - 이름
   * @param tel - 전화번호
   * @param userType - 유저 권한 [user, admin master]
   */
  async insertUser(
    username: string,
    password: string,
    name: string,
    userType: 'user' | 'admin' | 'master'
  ): Promise<void> {
    const salt = getRandom("all", 32)

    await this.userRepository.save({
      username,
      password: hash(password + salt),
      salt,
      name,
      userType
    }).then((res) => {
      const fs = new fileSystem();
      fs.mkdir('/public/result/', res.username, 'Ignore')
      fs.mkdir('/public/tmp/', res.username, 'Ignore')
      fs.mkdir(`/public/tmp/${res.username}/`, 'tp', 'Ignore')
      fs.mkdir(`/public/tmp/${res.username}/`, 'mv', 'Ignore')
      fs.mkdir(`/public/tmp/${res.username}/`, 'cp', 'Ignore')
      fs.mkdir(`/public/tmp/${res.username}/`, 'rst', 'Ignore')
      fs.mkdir(`/public/tmp/${res.username}/`, 'ErrorFile', 'Ignore')
      fs.mkdir(`/public/tmp/${res.username}/`, 'undefinedModel', 'Ignore')
    })
  }

  /**
   * @param uuid - 유저 uuid
   */
  async createToken(uuid: string) {
    const user = await this.findOneById(uuid);

    if (user === null) throw new UnauthorizedException({ message: '아이디 혹은 비밀번호를 확인해주세요.' })
    const payload = { id: user.uuid }

    return {
      success: true,
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  /**
   * @param data - 토큰
   */
  async verifyToken(data: string) {
    const token = this.extractTokenFromHeader(data);
    try {
      if (token === null) throw new Error();
      const payload = await this.jwtService.verifyAsync(
        token,
        { secret: this.configService.get("JWT_SECRET") }
      );

      const user = await this.userRepository.findOne({
        where: { uuid: payload.id }
      })

      if (payload === null || user === null) return null;
      else {
        return { payload }
      }
    } catch (err) {
      return null;
    }
  }

  async findByUsersPaginationAndType(page: number, type: "master" | "user" | "admin" | "all") {
    return await this.userRepository.find({
      where: {
        type: type === "all" ? undefined : type
      },
      skip: page * 15,
      take: 15
    })
  }
}
