import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }


  async create(createUserDto: CreateUserDto) {
    const { name, email, phone, password, role } = createUserDto;

    // Vérifiez si un utilisateur avec le même username existe déjà
    const existingUserByUsername = name
      ? await this.prisma.user.findUnique({
          where: { username: name },
        })
      : null;

    // Vérifiez si un utilisateur avec le même email existe déjà
    const existingUserByEmail = await this.prisma.user.findUnique({
      where: { email },
    });

    // Vérifiez si un utilisateur avec le même phone existe déjà
    const existingUserByPhone = phone
      ? await this.prisma.user.findFirst({
          where: { phone },
        })
      : null;

    // Lancez une exception si un utilisateur existe déjà avec l'un des critères
    if (existingUserByUsername) {
      throw new ConflictException(`Username ${name} is already taken`);
    }
    if (existingUserByEmail) {
      throw new ConflictException(`Email ${email} is already in use`);
    }
    if (existingUserByPhone) {
      throw new ConflictException(`Phone number ${phone} is already in use`);
    }

    // Créez le nouvel utilisateur si toutes les vérifications passent
    return this.prisma.user.create({
      data: {
        username: name,
        email,
        password,
        role,
        phone: phone ?? null,  // Utilisez null si phone n'est pas fourni
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async updateUser(id: number, updateUserDto: { email?: string; password?: string; username?: string; phone?: string; role?: string }) {
    try {
      // Vérifiez si l'utilisateur existe avant de tenter une mise à jour
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // Gérez les erreurs Prisma spécifiques
        throw new BadRequestException('Invalid data provided for user update');
      }
      throw error;
    }
  }

  async deleteUser(id: number) {
    try {
      // Assurez-vous que id est un nombre
      if (typeof id !== 'number' || isNaN(id)) {
        throw new BadRequestException('ID must be a valid number.');
      }

      // Vérifiez si l'utilisateur existe avant de tenter une suppression
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // Gérez les erreurs Prisma spécifiques
        throw new BadRequestException('Error occurred while deleting user');
      }
      throw error;
    }
  }
}
