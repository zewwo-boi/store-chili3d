import { Box } from './nodes/box';
import { Circle } from './nodes/circle';
import { Cone } from './nodes/cone';
import { Cylinder } from './nodes/cylinder';
import { Ellipse } from './nodes/ellipse';
import { Line } from './nodes/line';
import { Polygon } from './nodes/polygon';
import { Prism } from './nodes/prism';
import { Pyramid } from './nodes/pyramid';
import { Rect } from './nodes/rect';
import { Revolved } from './nodes/revolved';
import { Sphere } from './nodes/sphere';
import { Sweeped } from './nodes/sweeped';

export type NodeShape =
  | Box
  | Circle
  | Cone
  | Cylinder
  | Ellipse
  | Line
  | Polygon
  | Prism
  | Pyramid
  | Rect
  | Revolved
  | Sphere
  | Sweeped;

export type Node = NodeShape & {
  scale?: any;
};
