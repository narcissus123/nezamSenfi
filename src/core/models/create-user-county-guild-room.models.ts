
export interface CreateUserCountyGuildRoom {
  userId: number;
  allowedRoles: Array<number>;
  countyId: number;
  countyGuildRoomViceManagerClaims : Array<number>;
  countyGuildRoomExecutiveManagerClaims : Array<number>;
}
  