'use client';

import { useAccessToken } from '@/app/client-hooks/access-token';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getShippingAppData, setShippingAppData } from '@/app/actions/app-data';
import { ShippingAppData } from '@/app/types/app-data.model';
export const useShippingAppData = () => {
  const accessTokenPromise = useAccessToken();
  return useQuery<ShippingAppData>({
    queryKey: ['shipping-app-data'],
    queryFn: async () => {
      const accessToken = await accessTokenPromise;
      const data = await getShippingAppData({ accessToken });
      console.log('** useShippingAppData::data - ', data);
      return data;
    },
  });
};

export const useSetShippingAppData = () => {
  const accessTokenPromise = useAccessToken();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (newData: ShippingAppData) => {
      const accessToken = await accessTokenPromise;
      return setShippingAppData(newData, { accessToken });
    },
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: ['shipping-app-data'] });
    },
  });
  return mutateAsync;
};
