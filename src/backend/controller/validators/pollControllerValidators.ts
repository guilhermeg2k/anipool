import { z } from 'zod';

const getQueryParamsSchema = z.object({
  id: z.string().uuid(),
});

export type GetQueryParams = z.infer<typeof getQueryParamsSchema>;

export const validateGetQueryParams = (query: unknown) => {
  getQueryParamsSchema.parse(query);
};

const listByUserIdQueryParamsSchema = z.object({
  userId: z.string().uuid(),
});

export type ListByUserIdQueryParams = z.infer<
  typeof listByUserIdQueryParamsSchema
>;

export const validateListByUserIdQueryParams = (query: unknown) => {
  listByUserIdQueryParamsSchema.parse(query);
};

const getResultQueryParamsSchema = z.object({
  pollId: z.string().uuid(),
});

export type GetResultQueryParams = z.infer<typeof getResultQueryParamsSchema>;

export const validateGetResultQueryParams = (query: unknown) => {
  getResultQueryParamsSchema.parse(query);
};

const createPollBodySchema = z.object({
  title: z.string(),
  endDate: z.preprocess((endDate) => {
    if (typeof endDate == 'string' || endDate instanceof Date)
      return new Date(endDate);
  }, z.date().min(new Date())),
  options: z.array(
    z.object({
      anilistId: z.number(),
      type: z.string(),
      text: z.string().optional(),
    })
  ),
  multiOptions: z.boolean(),
});

export type CreatePollBody = z.infer<typeof createPollBodySchema>;

export const validateCreatePollBody = (body: unknown) => {
  createPollBodySchema.parse(body);
};
