import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator'; // Assurez-vous que ce chemin est correct

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Utilisez la chaîne de caractères 'roles' comme clé de métadonnée
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // Si aucun rôle n'est défini, tout le monde est autorisé
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // Assurez-vous d'avoir une fonction matchRoles pour vérifier les rôles
    return matchRoles(roles, user.roles);
  }
}

// Exemple de fonction matchRoles
function matchRoles(requiredRoles: string[], userRoles: string[]): boolean {
  if (!userRoles) {
    return false;
  }
  return requiredRoles.some(role => userRoles.includes(role));
}
