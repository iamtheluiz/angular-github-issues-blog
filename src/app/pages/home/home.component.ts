import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PoAvatarModule, PoButtonModule, PoInfoModule, PoInfoOrientation, PoListViewModule } from '@po-ui/ng-components';
import { Post, PostService } from '../../posts/post.service';

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
  page = 1;
  pageSize = 30;
  total = 0;
  loading = false;

  orientation = PoInfoOrientation.Horizontal;

  private readonly postService = inject(PostService);

  async loadPosts(page: number): Promise<void> {
    this.loading = true;

    const { posts, total } = await this.postService.getPostList(page, this.pageSize);

    this.posts = page === 1 ? posts : [...this.posts, ...posts];
    this.total = total;
    this.page = page;

    this.loading = false;
  }

  async ngOnInit(): Promise<void> {
    await this.loadPosts(this.page);
  }

  async loadMore(): Promise<void> {
    const nextPage = this.page + 1;

    await this.loadPosts(nextPage);
  }
}
