import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'messageContent'
})
export class MessageContentPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.startsWith("{") ? this.getPrettyPrintedJSON(value) : value;
  }

  private getPrettyPrintedJSON(value: any): string {
    return JSON.stringify(JSON.parse(value), null, 2);
  }

}
