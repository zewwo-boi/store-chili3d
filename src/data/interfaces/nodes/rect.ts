import { Transform } from '../properties/transform';
import { Plane } from '../properties/plane';

export class Rect {
  shapeClass: "rect";
  name?: string;
  mesh?: any;
  transform?: Transform;
  plane?: Plane;
  dx?: number;
  dy?: number;
  isFace?: boolean;
}