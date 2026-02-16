import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'demopipe',
  pure: false
})
export class DemopipePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    console.log('pure pipe called', value)
    return value.toUpperCase();
  }

}
