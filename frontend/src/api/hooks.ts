import { useQuery } from '@tanstack/react-query'
import { apiClient, endpoints } from './client'
import type { Cake } from '../types'
import { MOCK_CAKES } from '../data/mockCakes'

export const useCakes = () =>
  useQuery({
    queryKey: ['cakes'],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<Cake[]>(endpoints.cakes)
        // If data is array and empty, or invalid, use mock
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
        console.warn("API returned empty data, using mock data");
        return MOCK_CAKES;
      } catch (error) {
        console.warn("API failed, using mock data", error);
        return MOCK_CAKES;
      }
    },
  })

export const useDeliveryTracking = (orderId?: string) =>
  useQuery({
    enabled: Boolean(orderId),
    queryKey: ['delivery-track', orderId],
    queryFn: async () => {
      const { data } = await apiClient.get(endpoints.deliveryTrack, {
        params: { order_id: orderId },
      })
      return data as {
        order_id: string
        distance: string
        duration: string
        delivery_address: string
      }
    },
  })
