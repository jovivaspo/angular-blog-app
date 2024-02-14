export interface User {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  profileImage?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  EDITOR = 'editor',
  CHIEFEDITOR = 'chiefeditor',
}

export interface UsersPaginated {
  items: User[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}
