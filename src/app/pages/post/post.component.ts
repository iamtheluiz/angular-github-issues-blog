import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../home/home.component';
import { MarkdownComponent } from 'ngx-markdown';
import { repoInfo } from '../../constants/repo';

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

  constructor(private activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe((params: any) => {
      this.number = params.number;

      this.loadPost(params.number);
    });
  }

  async loadPost(number: string): Promise<void> {
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

      this.post = {
        id: post.id,
        title: post.title,
        labels: post.labels,
        body: post.body,
        user: post.user,
        state: post.state,
        updated_at: post.updated_at,
        created_at: post.created_at
      };
    } catch (error) {
      console.error(error);
      this.router.navigate(['/']);
    }
  }
}
