import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PoAvatarModule, PoButtonModule, PoInfoModule, PoInfoOrientation, PoListViewModule } from '@po-ui/ng-components';
import { repoInfo } from '../../constants/repo';

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

@Component({
  selector: 'app-home',
  imports: [
    PoListViewModule,
    PoInfoModule,
    PoAvatarModule,
    PoButtonModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  posts: Array<Post> = [];
  page = 0;
  pageSize = 30;
  total = 0;
  loading = false;

  orientation = PoInfoOrientation.Horizontal;

  async ngOnInit(): Promise<void> {
    this.loadMore();
  }

  async loadMore(): Promise<void> {
    this.loading = true;

    this.page += 1;
    const url = `https://api.github.com/search/issues?q=repo:${repoInfo.owner}/${repoInfo.name}+type:issue+state:open&per_page=${this.pageSize}&page=${this.page}`;

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

      this.posts = [...this.posts, ...serializedPosts];
      this.total = total_count;
    } catch (error) {
      console.error(error);
    }

    this.loading = false;
  }
}
