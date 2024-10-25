import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/db/schemas/user.schema';
import { SignupDto } from './dtos/signup.dto';
import { hash, compare } from 'bcrypt';
import { SigninDto } from './dtos/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(userData: SignupDto) {
    try {
      userData.password = await hash(userData.password, 10);

      await this.userModel.create(userData);

      return { message: 'user created successfully' };
    } catch (err) {
      if (err instanceof Error && 'code' in err && err.code === 11000)
        throw new HttpException({ message: 'user is already exists' }, 409);

      throw new HttpException({ message: 'something went wrong' }, 500);
    }
  }

  async signin(userData: SigninDto) {
    try {
      const userDoc = await this.userModel.findOne({ email: userData.email });

      const ok = await compare(userData.password, userDoc.password);

      if (!userDoc || !ok)
        throw new HttpException({ message: 'invalid credentials' }, 403);

      const user = userDoc.toObject();
      delete user.password;

      const payload = { _id: user._id, email: user.email };

      return {
        message: 'success',
        user,
        access_token: this.jwtService.sign(payload, {
          expiresIn: process.env.JWT_SECRET_ACCESS_TOKEN_EXPIRES_IN,
          secret: process.env.JWT_SECRET_ACCESS_TOKEN,
        }),
        refresh_token: this.jwtService.sign(payload, {
          expiresIn: process.env.JWT_SECRET_REFRESH_TOKEN_EXPIRES_IN,
          secret: process.env.JWT_SECRET_REFRESH_TOKEN,
        }),
      };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'invalid credentials' }, 403);
    }
  }

  async refreshToken(refresh_token: string) {
    try {
      const payload = this.jwtService.verify(refresh_token, {
        secret: process.env.JWT_SECRET_REFRESH_TOKEN,
      });

      const userDoc = await this.userModel.findOne(
        { _id: payload._id },
        { _id: 1, email: 1 },
      );

      if (!userDoc._id)
        throw new HttpException({ message: 'invalid refresh token' }, 403);

      const user = userDoc.toObject();
      const { _id, email } = user;

      return {
        message: 'success',
        access_token: this.jwtService.sign(
          { _id, email },
          {
            expiresIn: process.env.JWT_SECRET_ACCESS_TOKEN_EXPIRES_IN,
            secret: process.env.JWT_SECRET_ACCESS_TOKEN,
          },
        ),
        refresh_token,
      };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'invalid refresh token' }, 403);
    }
  }

  async revokeRefreshToken(refresh_token: string) {
    try {
      const payload = this.jwtService.verify(refresh_token, {
        secret: process.env.JWT_SECRET_REFRESH_TOKEN,
      });

      const userDoc = await this.userModel.findOne(
        { _id: payload._id },
        { _id: 1 },
      );

      if (!userDoc._id)
        throw new HttpException({ message: 'invalid refresh token' }, 403);

      return { message: 'success' };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'invalid refresh token' }, 403);
    }
  }
}
