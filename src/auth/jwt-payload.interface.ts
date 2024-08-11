// interfaces/jwt-payload.interface.ts

export interface JwtPayload {
    username: string; // Nom d'utilisateur
    sub: number;      // Identifiant de l'utilisateur (ou tout autre identifiant unique)
  }
  