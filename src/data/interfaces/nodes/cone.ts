import { Transform } from '../properties/transform';
import { XYZ } from '../properties/xyz';

export class Cone {
  shapeClass: "cone";
  name?: string;
  mesh?: any;
  transform?: Transform;
  center?: XYZ;
  radius?: number;
  dz?: number;
  normal?: XYZ;
}