import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'placeType'
})
export class PlaceTypePipe implements PipeTransform {

  transform(val: any, filter?: any): any {
    
    if(val=="infield_fly"){
        return "Infield Fly"
    }
    if(val=="bb"){
        return "Walk"
    }
    if(val=="k"){
        return "Strikeout"
    }
    if(val=="ground_out"){
        return "Ground Out"
    }
    if(val=="fly_out"){
        return "Fly Out"
    }
    if(val=="hit"){
        return "Hit"
    }
    if(val=="come"){
      return "Come";
    }
    if(val=="passline"){
      return "Passline";
    }
  return val;
  }

}
