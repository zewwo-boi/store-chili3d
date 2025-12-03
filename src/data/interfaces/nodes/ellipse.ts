import { Transform } from '../properties/transform';
import { XYZ } from '../properties/xyz';

export class Ellipse {
  shapeClass: "ellipse";
  name?: string;
  mesh?: any;
  transform?: Transform;
  center?: XYZ;
  majorRadius?: number;
  minorRadius?: number;
  normal?: XYZ;
  xvec?: XYZ;
  isFace?: boolean;
}