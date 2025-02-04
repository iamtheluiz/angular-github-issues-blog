import { Injectable } from '@angular/core';
import { repoInfo } from '../constants/repo';

export interface Post {
  id: number;
  title: string;
  labels: any[];
  body: string;
  user: any;
  state: string;
  updated_at: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor() { }

  async getPostList(page: number, pageSize: number) {
    const url = `https://api.github.com/search/issues?q=repo:${repoInfo.owner}/${repoInfo.name}+type:issue+state:open&per_page=${pageSize}&page=${page}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching issues: ${response.statusText}`);
      }
      const { items, total_count } = await response.json();

      const serializedPosts = items.map((issue: any) => {
        const { id, number, title, labels, body, user, state, updated_at, created_at } = issue;

        return {
          id,
          number,
          title,
          labels,
          body,
          user,
          state,
          updated_at,
          created_at
        };
      })

      return {
        posts: serializedPosts,
        total: total_count
      };
    } catch (error) {
      console.error(error);

      return {
        posts: [],
        total: 0
      };
    }
  }

  async getPost(number: string): Promise<Post | undefined> {
    const url = `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.name}/issues/${number}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error fetching issue: ${response.statusText}`);
      }
      const post = await response.json();

      if (post.body === '') {
        throw new Error('Empty post body');
      }

      return {
        id: post.id,
        title: post.title,
        labels: post.labels,
        body: post.body,
        user: post.user,
        state: post.state,
        updated_at: post.updated_at,
        created_at: post.created_at
      } as Post;
    } catch (error) {
      console.error(error);

      return undefined;
    }
  }
}
