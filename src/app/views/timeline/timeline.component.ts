import {Component, OnInit} from '@angular/core';
import {sources, SourceService} from "@services/source.service";
import {HttpClient} from '@angular/common/http';
import {RssItem} from '@models/rss-item';
import {combineLatest} from 'rxjs';
import {RssSource} from '@models/rss-source';
import {DatePipe, SlicePipe} from '@angular/common';
import {UrlPipe} from '../../pipes/url.pipe';
import {DateAgoPipe} from '../../pipes/date-ago.pipe';

@Component({
  selector: 'app-homepage',
  imports: [
    UrlPipe,
    DateAgoPipe,
    SlicePipe
  ],
  templateUrl: './timeline.component.html',
  providers: [
    DatePipe
  ]
})
export class TimelineComponent implements OnInit {
  feed: RssItem[] = [];
  page = 0;

  constructor(
    private sourceService: SourceService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    combineLatest(
      sources().map(source => this.httpClient.get<RssSource>('https://api.rss2json.com/v1/api.json?rss_url=' + source.link))
    ).subscribe({
      next: value => {
        value.forEach(source => this.feed.push(...source.items));
        this.feed = this.feed.sort((a,b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
      }, error: err => console.error
    })
  }
}
