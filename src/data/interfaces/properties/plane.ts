import { XYZ } from './xyz';

export class Plane {
  classKey?: "plane";
  properties?: {
    normal?: XYZ;
    origin?: XYZ;
    xvec?: XYZ;
  };
}