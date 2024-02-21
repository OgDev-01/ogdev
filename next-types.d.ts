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

interface DEVBlogs {
  readonly type_of: string;
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly cover_image: string;
  readonly published_at: string;
  readonly tag_list: string[];
  readonly slug: string;
  readonly url: string;
  readonly canonical_url: string;
  readonly comments_count: number;
  readonly positive_reactions_count: number;
  readonly public_reactions_count: number;
  readonly page_views_count: number;
  readonly published_timestamp: string;
  readonly reading_time_minutes: number;
  readonly body_markdown: string;
  readonly user: {
    readonly name: string;
    readonly username: string;
    readonly twitter_username: string;
    readonly github_username: string;
    readonly website_url: string;
    readonly profile_image: string;
  };
}
