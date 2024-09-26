import { Story, StoryItem } from '@prisma/client';
import { axiosInstance } from '@/shared/services/instance';

export type IStory = Story & {
  items: StoryItem[];
};

export const getAll = async () => {
  const { data } = await axiosInstance.get<IStory[]>('/stories');

  return data;
};
