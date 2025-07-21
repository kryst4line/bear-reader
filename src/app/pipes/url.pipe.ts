import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'url'
})
export class UrlPipe implements PipeTransform {

  transform(url: string): unknown {
    return new URL(url).hostname.replace('www.','');
  }

}
