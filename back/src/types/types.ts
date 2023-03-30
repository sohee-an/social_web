export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  name: string;
  coverPic?: string;
  profilePic?: string;
  city?: string;
  website?: string;
}
