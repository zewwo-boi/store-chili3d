import { Transform } from '../properties/transform';
import { XYZ } from '../properties/xyz';

export class Sphere {
  shapeClass: "sphere";
  name?: string;
  mesh?: any;
  transform?: Transform;
  center?: XYZ;
  radius?: number;
  shape?: any;
}