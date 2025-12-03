import { Transform } from '../properties/transform';
import { XYZ } from '../properties/xyz';

export class Revolved {
  shapeClass: "revolve";
  name?: string;
  mesh?: any;
  transform?: Transform;
  profile?: any;
  axis?: XYZ;
  angle?: number;
}