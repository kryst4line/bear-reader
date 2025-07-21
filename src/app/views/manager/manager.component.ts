import {Component, ElementRef, OnInit, viewChild} from '@angular/core';
import {sources, SourceService} from '@services/source.service';
import {HttpClient} from '@angular/common/http';
import {RssSource} from '@models/rss-source';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './manager.component.html'
})
export class ManagerComponent {
  rssInput = viewChild<ElementRef<HTMLInputElement>>('rssInput');

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
      error: err => console.error
    })
  }

  protected readonly sources = sources;
}
