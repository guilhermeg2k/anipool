import { z } from 'zod';

export const getQueryParamsSchema = z.object({
  id: z.string().uuid(),
});

export const listByUserIdQueryParamsSchema = z.object({
  userId: z.string().uuid(),
});

export const getResultQueryParamsSchema = z.object({
  pollId: z.string().uuid(),
});

export const deleteByIdQueryParamsSchema = z.object({
  pollId: z.string().uuid(),
});

export const createPollBodySchema = z.object({
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
  resultsVisibility: z.enum(['ALWAYS_VISIBLE', 'AFTER_END']),
});
