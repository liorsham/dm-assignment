import { StreetsService } from '../StreetsService';
import axios from 'axios';
import { City } from '../cities';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('StreetsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getStreetsInCity', () => {
    it('should fetch streets for a valid city', async () => {
      const mockResponse = {
        data: {
          result: {
            records: [
              {
                _id: 1,
                street_name: 'Test Street',
                city_name: 'תל אביב',
                region_name: 'Test Region',
                street_code: 123,
                city_code: 456,
                region_code: 789,
                street_name_status: 'active',
                official_code: 321
              }
            ]
          }
        }
      };

      mockedAxios.create.mockReturnValue({
        post: jest.fn().mockResolvedValue(mockResponse)
      } as any);

      const result = await StreetsService.getStreetsInCity('Tel Aviv Jaffa' as City);
      
      expect(result.city).toBe('Tel Aviv Jaffa');
      expect(result.streets).toHaveLength(1);
      expect(result.streets[0].street_name).toBe('Test Street');
    });

    it('should throw error for invalid city', async () => {
      await expect(StreetsService.getStreetsInCity('Invalid City' as City))
        .rejects
        .toThrow('Invalid City is not a valid city.');
    });

  });

  describe('getStreetInfoById', () => {
    it('should fetch street info by id', async () => {
      const mockStreet = {
        _id: 1,
        street_name: 'Test Street',
        city_name: 'תל אביב',
        region_name: 'Test Region',
        street_code: 123,
        city_code: 456,
        region_code: 789,
        street_name_status: 'active',
        official_code: 321
      };

      const mockResponse = {
        data: {
          result: {
            records: [mockStreet]
          }
        }
      };

      mockedAxios.create.mockReturnValue({
        post: jest.fn().mockResolvedValue(mockResponse)
      } as any);

      const result = await StreetsService.getStreetInfoById(1);
      
      expect(result.streetId).toBe(1);
      expect(result.street_name).toBe('Test Street');
      expect(result.city_name).toBe(undefined);
    });

  });
}); 