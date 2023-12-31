import { Platform } from 'react-native';

import {
  ERROR_CODES,
  getTrackApiBasicParams,
  SDK_MEDIUM,
  MAD_UUID,
  MSD_USER_ID,
  DISCOVER_EVENTS_MAP,
  TrackApiBasicParams,
  API_SUCCESS_STATUS,
  MSD_DISCOVER_EVENTS_ENDPOINT,
  MSD_TRACK_ENDPOINT,
} from '../constants';
import { logger, getFromStorage, constructDiscoverEventsMap } from '../utils';
import { ApiMethods, apiCall } from '../api';
import { getBundleId } from '../native-bridge';

export const useEvents = () => {
  const track = async (
    eventName: string,
    params: object = {},
    correlationId?: string | null
  ) => {
    let configMapResponse = await getFromStorage(DISCOVER_EVENTS_MAP);
    let discoverEventsMap: Record<string, any> = {};
    if (configMapResponse) {
      discoverEventsMap = JSON.parse(configMapResponse);
    }
    try {
      if (!Object.keys(discoverEventsMap)?.length) {
        const response = await apiCall({
          url: MSD_DISCOVER_EVENTS_ENDPOINT,
          method: ApiMethods.GET,
        });
        if (response) {
          const { result } = response;
          if (result?.data?.events) {
            await constructDiscoverEventsMap(result.data.events);
            configMapResponse = await getFromStorage(DISCOVER_EVENTS_MAP);
            if (configMapResponse) {
              discoverEventsMap = JSON.parse(configMapResponse);
            }
          }
        }
      }
    } catch (error) {
      logger.error(
        `{ status: ${ERROR_CODES.ERR0010.code}, message: ${ERROR_CODES.ERR0010.message} }`
      );
    }
    if (eventName?.length > 0) {
      try {
        const configMapForEvent = discoverEventsMap?.[eventName] ?? {};
        const bundleId = await getBundleId();
        const eventApiBasicParamsMap: Record<string, string | number> = {};
        const trackApiBasicParamValueMap: Record<
          TrackApiBasicParams,
          string | number
        > = {
          blox_uuid: await getFromStorage(MAD_UUID),
          user_id: await getFromStorage(MSD_USER_ID),
          platform: Platform.OS,
          url: bundleId,
          medium: SDK_MEDIUM,
          referrer: Platform.OS,
        };
        getTrackApiBasicParams().forEach((key) => {
          const value = trackApiBasicParamValueMap[key as TrackApiBasicParams];
          if (value) {
            eventApiBasicParamsMap[configMapForEvent?.[key] ?? key] = value;
          }
        });

        if (!params || Object.keys(params).length === 0) {
          logger.error(
            `{ status: ${ERROR_CODES.ERR003.code}, message: ${ERROR_CODES.ERR003.message} }`
          );
          return;
        }
        const eventParams = {
          event_name: eventName,
          ...params,
          ...eventApiBasicParamsMap,
        };
        const response = await apiCall({
          url: MSD_TRACK_ENDPOINT,
          method: ApiMethods.POST,
          params: eventParams,
          ...(correlationId
            ? { headers: { 'x-correlation-id': correlationId } }
            : {}),
        });
        if (response) {
          const { status, result } = response;
          if (status === API_SUCCESS_STATUS) {
            logger.info(JSON.stringify(result));
          } else {
            logger.error(JSON.stringify(result));
          }
        }
      } catch (error) {
        logger.error(
          `{ status: ${ERROR_CODES.ERR0011.code}, message: ${ERROR_CODES.ERR0011.message} }`
        );
      }
    } else {
      logger.error(
        `{ status: ${ERROR_CODES.ERR002.code}, message: ${ERROR_CODES.ERR002.message} }`
      );
    }
  };
  return {
    track,
  };
};
