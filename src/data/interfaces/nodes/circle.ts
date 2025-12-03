import { Transform } from '../properties/transform';
import { XYZ } from '../properties/xyz';

export class Circle {
  shapeClass: "circle";
  name?: string;
  mesh?: any;
  transform?: Transform;
  center?: XYZ;
  radius?: number;
  normal?: XYZ;
  isFace?: boolean;
  shape?: any;
}