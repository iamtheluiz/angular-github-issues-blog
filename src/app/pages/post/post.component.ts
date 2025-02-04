import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { Post, PostService } from '../../posts/post.service';

@Component({
  selector: 'app-post',
  imports: [
    MarkdownComponent
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  number: string = '';
  post: Post | undefined;

  private readonly router = inject(Router);
  private readonly postService = inject(PostService);

  constructor(private activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(async (params: any) => {
      this.number = params.number;

      const post = await this.postService.getPost(params.number)

      if (!post) {
        this.router.navigate(['/']);
      }

      this.post = post;
    });
  }
}
