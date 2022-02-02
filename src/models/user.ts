export interface IUser {
  pk: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  isStaff: boolean;
}

export function getSomeName(user: IUser) {
  const names = [user.firstName, user.lastName].filter((n) => !!n);
  return !!names.length ? names.join(" ") : user.username;
}
