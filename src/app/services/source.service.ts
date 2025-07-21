import {Injectable, signal, WritableSignal} from '@angular/core';
import {RssFeed} from '@models/rss-feed';

export const sources: WritableSignal<RssFeed[]> = signal([]);

@Injectable({
  providedIn: 'root'
})
export class SourceService {
  public init() {
    if (!localStorage.getItem('sources'))
      localStorage.setItem('sources', JSON.stringify([]));
    const storage = localStorage.getItem('sources') ?? '[]';
    sources.set(JSON.parse(storage));
  }

  private updateStorage() {
    localStorage.setItem('sources', JSON.stringify(sources()))
  }

  public add(feed: RssFeed) {
    if (!sources().some(f => f.link == feed.link)) {
      sources.update(array => {
        array = [...array, feed];
        return array;
      });
      this.updateStorage();
    }
  }
}
