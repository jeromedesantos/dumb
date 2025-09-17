export interface ReplyType {
  id: string;
  photo_profile: string | null;
  full_name: string;
  username: string | null;
  age: string | null;
  content: string | null;
  image: string | null;
  pending?: boolean;
}
