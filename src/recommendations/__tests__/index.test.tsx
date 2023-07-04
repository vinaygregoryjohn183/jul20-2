import { renderHook, act } from '@testing-library/react-hooks';
import { useRecommendations } from '../index';
import { apiCall } from '../../api';
import { getFromStorage } from '../../utils/storage';
import { MSD_SEARCH_ENDPOINT, ERROR_CODES } from '../../constants';

jest.mock('../../api');
jest.mock('../../utils/storage');

describe('useRecommendations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const blox_uuid = 'http://baseUrl';
  const user_id = 'user-id';

  it('should fetch recommendations by module successfully', async () => {
    const mockRecommendationByModuleResponse = {
      data: ['recommendation1'],
    };
    (getFromStorage as jest.MockedFunction<typeof getFromStorage>)
      .mockResolvedValueOnce(blox_uuid)
      .mockResolvedValueOnce(user_id);

    (apiCall as jest.MockedFunction<typeof apiCall>).mockResolvedValue({
      status: 200,
      result: mockRecommendationByModuleResponse,
    });

    const { result: _result, waitForNextUpdate } = renderHook(() =>
      useRecommendations()
    );

    act(() => {
      _result.current.getRecommendationByModule(
        'module_1',
        {
          catalogs: {},
        },
        ''
      );
    });

    expect(_result.current.recommendations.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(apiCall).toHaveBeenCalledTimes(1);
    expect(apiCall).toHaveBeenCalledWith({
      url: MSD_SEARCH_ENDPOINT,
      method: 'POST',
      params: {
        blox_uuid: expect.any(String),
        user_id: expect.any(String),
        platform: expect.any(String),
        medium: expect.any(String),
        referrer: expect.any(String),
        url: expect.any(String),
        module_name: 'module_1',
        catalogs: {},
      },
    });

    expect(_result.current.recommendations.data).toEqual(
      mockRecommendationByModuleResponse.data
    );
    expect(_result.current.recommendations.isLoading).toBe(false);
    expect(_result.current.recommendations.error).toBe(null);
  });

  it('should handle API error when fetching recommendations by module', async () => {
    const mockError = {
      errors: [
        {
          code: ERROR_CODES.ERR0011.code,
          message: ERROR_CODES.ERR0011.message,
        },
      ],
    };
    (apiCall as jest.MockedFunction<typeof apiCall>).mockRejectedValueOnce(
      mockError
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useRecommendations()
    );

    expect(result.current.recommendations.isLoading).toBe(false);
    expect(result.current.recommendations.data).toBeNull();
    expect(result.current.recommendations.error).toBeNull();

    act(() => {
      result.current.getRecommendationByModule(
        'module_1',
        { catalogs: {} },
        ''
      );
    });

    expect(result.current.recommendations.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(apiCall).toHaveBeenCalledTimes(1);

    expect(result.current.recommendations.data).toBe(null);
    expect(result.current.recommendations.isLoading).toBe(false);
    expect(result.current.recommendations.error).toEqual(mockError);
  });

  it('should fetch recommendations by strategy successfully', async () => {
    const mockRecommendationByStrategyResponse = {
      data: ['recommendation1'],
    };
    (getFromStorage as jest.MockedFunction<typeof getFromStorage>)
      .mockResolvedValueOnce(blox_uuid)
      .mockResolvedValueOnce(user_id);

    (apiCall as jest.MockedFunction<typeof apiCall>).mockResolvedValue({
      status: 200,
      result: mockRecommendationByStrategyResponse,
    });

    const { result: _result, waitForNextUpdate } = renderHook(() =>
      useRecommendations()
    );

    act(() => {
      _result.current.getRecommendationByStrategy(
        'strategy_1',
        {
          catalogs: {},
        },
        ''
      );
    });

    expect(_result.current.recommendations.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(apiCall).toHaveBeenCalledTimes(1);
    expect(apiCall).toHaveBeenCalledWith({
      url: MSD_SEARCH_ENDPOINT,
      method: 'POST',
      params: {
        blox_uuid: expect.any(String),
        user_id: expect.any(String),
        platform: expect.any(String),
        medium: expect.any(String),
        referrer: expect.any(String),
        url: expect.any(String),
        strategy_name: 'strategy_1',
        catalogs: {},
      },
    });

    expect(_result.current.recommendations.data).toEqual(
      mockRecommendationByStrategyResponse.data
    );
    expect(_result.current.recommendations.isLoading).toBe(false);
    expect(_result.current.recommendations.error).toBe(null);
  });

  it('should handle API error when fetching recommendations by strategy', async () => {
    const mockError = {
      errors: [
        {
          code: ERROR_CODES.ERR0011.code,
          message: ERROR_CODES.ERR0011.message,
        },
      ],
    };
    (apiCall as jest.MockedFunction<typeof apiCall>).mockRejectedValueOnce(
      mockError
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useRecommendations()
    );

    expect(result.current.recommendations.isLoading).toBe(false);
    expect(result.current.recommendations.data).toBeNull();
    expect(result.current.recommendations.error).toBeNull();

    act(() => {
      result.current.getRecommendationByStrategy(
        'strategy_1',
        {
          catalogs: {},
        },
        ''
      );
    });

    expect(result.current.recommendations.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(apiCall).toHaveBeenCalledTimes(1);

    expect(result.current.recommendations.data).toBe(null);
    expect(result.current.recommendations.isLoading).toBe(false);
    expect(result.current.recommendations.error).toEqual(mockError);
  });

  it('should fetch recommendations by page successfully', async () => {
    const mockRecommendationByPageResponse = {
      data: ['recommendation1'],
    };
    (getFromStorage as jest.MockedFunction<typeof getFromStorage>)
      .mockResolvedValueOnce(blox_uuid)
      .mockResolvedValueOnce(user_id);

    (apiCall as jest.MockedFunction<typeof apiCall>).mockResolvedValue({
      status: 200,
      result: mockRecommendationByPageResponse,
    });

    const { result: _result, waitForNextUpdate } = renderHook(() =>
      useRecommendations()
    );

    act(() => {
      _result.current.getRecommendationByPage(
        'page_1',
        {
          catalogs: {},
        },
        ''
      );
    });

    expect(_result.current.recommendations.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(apiCall).toHaveBeenCalledTimes(1);
    expect(apiCall).toHaveBeenCalledWith({
      url: MSD_SEARCH_ENDPOINT,
      method: 'POST',
      params: {
        blox_uuid: expect.any(String),
        user_id: expect.any(String),
        platform: expect.any(String),
        page_name: 'page_1',
        medium: expect.any(String),
        referrer: expect.any(String),
        url: expect.any(String),
        catalogs: {},
      },
    });

    expect(_result.current.recommendations.data).toEqual(
      mockRecommendationByPageResponse.data
    );
    expect(_result.current.recommendations.isLoading).toBe(false);
    expect(_result.current.recommendations.error).toBe(null);
  });

  it('should handle API error when fetching recommendations by page', async () => {
    const mockError = {
      errors: [
        {
          code: ERROR_CODES.ERR0011.code,
          message: ERROR_CODES.ERR0011.message,
        },
      ],
    };
    (apiCall as jest.MockedFunction<typeof apiCall>).mockRejectedValueOnce(
      mockError
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useRecommendations()
    );

    expect(result.current.recommendations.isLoading).toBe(false);
    expect(result.current.recommendations.data).toBeNull();
    expect(result.current.recommendations.error).toBeNull();

    act(() => {
      result.current.getRecommendationByPage('page_1', { catalogs: {} }, '');
    });

    expect(result.current.recommendations.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(apiCall).toHaveBeenCalledTimes(1);

    expect(result.current.recommendations.data).toBe(null);
    expect(result.current.recommendations.isLoading).toBe(false);
    expect(result.current.recommendations.error).toEqual(mockError);
  });
});
