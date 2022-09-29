import zod from 'zod';

export const create = zod.object({
  body: zod.object({
    url: zod.string().url(),

    title: zod
      .string({
        required_error: 'Title is required',
      })
      .min(3, 'Title must be at least 3 character')
      .max(100, 'Title must be less than 100 characters'),

    description: zod.string({
      required_error: 'Description is required',
    }),

    tags: zod.array(zod.string()).min(1, 'Tags must be at least 1 character'),

    userId: zod.string().optional(),
  }),
});

export const update = zod.object({
  body: zod.object({
    url: zod.string().url(),

    title: zod
      .string({
        required_error: 'Title is required',
      })
      .min(20, 'Title must be at least 20 character')
      .max(100, 'Title must be less than 100 characters'),

    description: zod.string({
      required_error: 'Description is required',
    }),

    tags: zod.array(zod.string()).min(1, 'Tags must be at least 1 character'),

    userId: zod.string().optional(),
  }),
});

export const id = zod.object({
  params: zod.object({
    id: zod.string({
      required_error: 'ID is required',
    }),
  }),
});

export const search = zod.object({
  query: zod.object({
    q: zod.string({
      required_error: 'Query is required',
    }),
  }),
});
