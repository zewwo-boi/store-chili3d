import { TimeRecord } from './main';

export class Commits {
  rootId: string;
  commits: Diff[];
}

export class Diff {
  parentId: string;
  change: TimeRecord;
}
