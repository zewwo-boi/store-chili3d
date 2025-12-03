import { Transform } from '../properties/transform';
import { Plane } from '../properties/plane';

export class Box {
  shapeClass: "box";
  name?: string;
  mesh?: any;
  transform?: Transform;
  plane?: Plane;
  dx?: number;
  dy?: number;
  dz?: number;
}