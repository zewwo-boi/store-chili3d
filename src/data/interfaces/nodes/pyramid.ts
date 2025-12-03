import { Transform } from '../properties/transform';
import { Plane } from '../properties/plane';

export class Pyramid {
  shapeClass: "pyramid";
  name?: string;
  mesh?: any;
  transform?: Transform;
  plane?: Plane;
  dx?: number;
  dy?: number;
  dz?: number;
}