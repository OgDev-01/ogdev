interface DbPageMeta {
  readonly page: number;
  readonly limit: number;
  readonly pageCount: number;
  readonly totalCount: number;
  readonly hasNextPage: boolean;
}

interface DbUser {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly avatar_url: string;
  readonly external_id: string;
  readonly created_at: string;
  readonly updated_at: string;
  readonly deleted_at: string;
}

interface DbProject {
  readonly id: number;
  readonly user_id: number;
  readonly title: string;
  readonly slug: string;
  readonly description: string;
  readonly cover_image: string;
  readonly content: string;
  readonly created_at: string;
  readonly updated_at: string;
  readonly deleted_at: string;
}

interface DbBlog {
  readonly id: number;
  readonly user_id: number;
  readonly title: string;
  readonly slug: string;
  readonly content: string;
  readonly cover_image: string;
  readonly created_at: string;
  readonly updated_at: string;
  readonly deleted_at: string;
}
