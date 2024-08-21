export type Song = {
  id: string;
  name: string;
  artist: string;
  title: string;
};

type RepertoireTable = {
  id: string;
  user_id: string;
  title: string;
  artist: string;
  createdAt: string;
  updatedAt: number;
  lyrics: string
};
