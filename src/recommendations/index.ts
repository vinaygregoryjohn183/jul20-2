import { useState } from 'react';

import {
  API_SUCCESS_STATUS,
  ERROR_CODES,
  MAD_UUID,
  MSD_USER_ID,
  SDK_PLATFORM,
  MSD_SEARCH_ENDPOINT,
} from '../constants';
import { apiCall, ApiMethods, IError } from '../api';
import type {
  IGetRecommendationRequest,
  IGetRecommendationBaseParams,
} from './types';
import { getFromStorage } from '../utils';

export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Array<object> | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<IError | null>(null);

  const getRecommendation = async (
    baseParams: IGetRecommendationBaseParams,
    properties: IGetRecommendationRequest,
    correlationId: string | null
  ) => {
    if (properties) {
      setLoading(true);
      const params = {
        blox_uuid: await getFromStorage(MAD_UUID),
        user_id: await getFromStorage(MSD_USER_ID),
        platform: SDK_PLATFORM,
        ...baseParams,
        ...properties,
      };

      try {
        const response = await apiCall({
          url: MSD_SEARCH_ENDPOINT,
          method: ApiMethods.POST,
          params,
          ...(correlationId
            ? { headers: { 'x-correlation-id': correlationId } }
            : {}),
        });
        if (response) {
          const result = await response.json();
          if (response?.status === API_SUCCESS_STATUS) {
            setRecommendations(result?.data || null);
          } else {
            setError(result);
          }
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setRecommendations(null);
        setError({
          errors: [
            {
              code: ERROR_CODES.ERR006.code,
              message: ERROR_CODES.ERR006.message,
            },
          ],
        });
      }
    } else {
      setRecommendations(null);
      setError({
        errors: [
          {
            code: ERROR_CODES.ERR004.code,
            message: ERROR_CODES.ERR004.message,
          },
        ],
      });
    }
  };

  const getRecommendationByStrategy = async (
    strategyReference: string,
    properties: IGetRecommendationRequest,
    correlationId: string | null
  ) => {
    getRecommendation(
      {
        strategy_name: strategyReference,
      },
      properties,
      correlationId
    );
  };

  const getRecommendationByModule = async (
    moduleReference: string,
    properties: IGetRecommendationRequest,
    correlationId: string | null
  ) => {
    getRecommendation(
      {
        module_name: moduleReference,
      },
      properties,
      correlationId
    );
  };

  const getRecommendationByPage = async (
    pageReference: string,
    properties: IGetRecommendationRequest,
    correlationId: string | null
  ) => {
    getRecommendation(
      {
        page_name: pageReference,
      },
      properties,
      correlationId
    );
  };

  const getRecommendationByText = async (
    textReference: string,
    properties: IGetRecommendationRequest,
    correlationId: string | null
  ) => {
    getRecommendation(
      {
        text_name: textReference,
      },
      properties,
      correlationId
    );
  };

  return {
    getRecommendationByStrategy,
    getRecommendationByModule,
    getRecommendationByPage,
    getRecommendationByText,
    recommendations: { data: recommendations, isLoading: loading, error },
  };
};
