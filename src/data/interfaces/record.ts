import { Node } from './node';
import { IProperty } from './property';

export type Record = INodeRecord | ArrayRecord | PropertyRecord;

export class INodeRecord {
  type: "node";
  action?: number;
  newParent?: Node;
  oldParent?: Node;
  newPrevious?: Node;
  oldPrevious?: Node;
}

export class ArrayRecord {
  type: "array";
  records?: Record[];
}

export class PropertyRecord {
  type: "property";
  name?: string;
  newValue?: IProperty;
  object?: Node;
  oldValue?: IProperty;
}