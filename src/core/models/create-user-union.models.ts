export interface CreateUserUnion {
  userId: number;
  allowedRoles: Array<number>;
  countyUnionId: number;
  unionViceManagerClaims: Array<number>;
  unionExecutiveManagerClaims: Array<number>;
  expertJobsClaim: Array<number>;
}
