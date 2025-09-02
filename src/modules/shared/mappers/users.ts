import { User } from "@prisma/client";
import { UsersDTO } from "../dto/users-dto";

class UsersMapper {
  static toDTO(user: User): UsersDTO {
    return {
      id: user.id,
      googleId: user.googleId ?? "",
      email: user.email,
      name: user.name ?? "",
      createdAt: user.created_at,
    };
  }

  static toPresentation(user: UsersDTO) {
    return {
      id: user.id,
      googleId: user.googleId,
      email: user.email,
      name: user.name,
      created_at: user.createdAt,
    };
  }
}

export { UsersMapper };
