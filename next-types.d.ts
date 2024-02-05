interface DbPageMeta {
  page: number;
  limit: number;
  pageCount: number;
  totalCount: number;
  hasNextPage: boolean;
}

interface DbUser {
  id: number;
  name: string;
  email: string;
  avatar_url: string;
  external_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
