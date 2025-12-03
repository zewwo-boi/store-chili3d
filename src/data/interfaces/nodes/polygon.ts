import { Transform } from '../properties/transform';

export class Polygon {
  shapeClass: "polygon";
  name?: string;
  mesh?: any;
  transform?: Transform;
  points?: any;
  isFace?: boolean;
}