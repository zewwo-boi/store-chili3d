import { Transform } from '../properties/transform';
import { XYZ } from '../properties/xyz';

export class Line {
  shapeClass: "line";
  name?: string;
  mesh?: any;
  transform?: Transform;
  start?: XYZ;
  end?: XYZ;
}