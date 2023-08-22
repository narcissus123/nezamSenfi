
export interface CreateUserProvinceGuildRoom {
  userId: number;
  allowedRoles: Array<number>;
  provinceId: number;
  provinceGuildRoomViceManagerClaims: Array<number>;
  provinceGuildRoomExecutiveManagerClaims: Array<number>;
}
  