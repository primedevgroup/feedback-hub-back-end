export type FeedbackDTO = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  targetId: string;
  squadId: string;
};
