export interface Note{
  id: string;
  title: string;
  content: string;
  createdAt: string;
  color: string;
  pinned: boolean;
}
export interface NoteStoreState{
  notes: Note[];
  loading: boolean;
  search: string;
  sortBy: string;
  page: number;
  limit: number;
  totalPage: number;
}