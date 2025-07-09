import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should format labels correctly', () => {
    const labels = [
      { name: 'blog' },
      { name: 'enhancement' },
      { name: 'feature' }
    ];
    
    const result = service.getFormattedLabels(labels);
    expect(result).toBe('blog, enhancement, feature');
  });

  it('should return empty string for empty labels', () => {
    const result = service.getFormattedLabels([]);
    expect(result).toBe('');
  });

  it('should build correct URL with blog label filter', () => {
    // Test that the URL includes the blog label filter
    const service = TestBed.inject(PostService);
    
    // We can test the URL construction by mocking fetch
    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve(new Response(JSON.stringify({
        items: [],
        total_count: 0
      })))
    );

    service.getPostList(1, 10);

    expect(window.fetch).toHaveBeenCalledWith(
      jasmine.stringMatching(/.*label:blog.*/)
    );
  });
});
