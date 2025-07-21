import {Component, ElementRef, viewChild} from '@angular/core';
import {sources, SourceService} from '@services/source.service';
import {HttpClient} from '@angular/common/http';
import {RssSource} from '@models/rss-source';
import {RssFeed} from '@models/rss-feed';
import {UrlPipe} from '../../pipes/url.pipe';

@Component({
  selector: 'app-homepage',
  imports: [
    UrlPipe
  ],
  templateUrl: './manager.component.html',
  styles: `
    ul li {
      div > small > small {
        opacity: 0;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }

      &:hover {
        div > small > small {
          opacity: 1;
        }
      }
    }
  `
})
export class ManagerComponent {
  rssInput = viewChild<ElementRef<HTMLInputElement>>('rssInput');
  protected readonly sources = sources;

  constructor(
    private sourceService: SourceService,
    private httpClient: HttpClient
  ) {}

  addSource() {
    this.httpClient.get('https://api.rss2json.com/v1/api.json?rss_url=' + this.rssInput()?.nativeElement.value).subscribe({
      next: source => {
        const feed = (source as RssSource).feed;
        this.sourceService.add(feed);
        (this.rssInput()?.nativeElement as HTMLInputElement).value = '';
      },
      error: console.error
    })
  }

  removeSource(feed: RssFeed) {
    this.sourceService.remove(feed);
  }
}
