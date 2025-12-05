import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from './data.service';
import { DATABASE_CONNECTION } from '../database/database.provider';
import { Commits } from './interfaces/diff';
import { TimeRecord } from './interfaces/main';

describe('DataService', () => {
  let service: DataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataService,
        {
          provide: DATABASE_CONNECTION,
          useValue: jest.fn(), // Mock the SQL connection
        },
      ],
    }).compile();

    service = module.get<DataService>(DataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateDataFromCommits', () => {
    it('should not add duplicate child ids to parent', async () => {
      const rootId = 'root';
      const parentId = 'parent';
      const childId = 'child';
      
      const storedData: TimeRecord[] = [
        {
          id: rootId,
          children: [parentId],
        },
        {
          id: parentId,
          children: [childId], // Child already exists
        },
        {
            id: childId,
            children: []
        }
      ];

      // Mock findOneData to return storedData
      jest.spyOn(service, 'findOneData').mockResolvedValue({
        id: rootId,
        time_record: storedData,
        created_at: new Date(),
        updated_at: new Date()
      });

      // Mock updateRecord
      const updateRecordSpy = jest.spyOn(service, 'updateRecord').mockResolvedValue([]);

      const commits: Commits = {
        rootId: rootId,
        commits: [
          {
            parentId: parentId,
            change: {
              id: childId,
              children: [],
              parentId: parentId
            },
          },
        ],
      };

      await service.updateDataFromCommits(commits);

      expect(updateRecordSpy).toHaveBeenCalled();
      const updatedData = updateRecordSpy.mock.calls[0][1] as TimeRecord[];
      const parent = updatedData.find(n => n.id === parentId);
      
      // Should still have only 1 childId
      expect(parent.children.filter(id => id === childId).length).toBe(1);
    });
  });
});
