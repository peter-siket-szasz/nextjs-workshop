'use server';

import { db } from '@/lib/db';
import { ErrorResponse } from '@/types/ErrorResponse';
import { cookies } from 'next/headers';
import { z } from 'zod';

interface CreateResponse {
  id: number;
  createdAt: Date;
  createdBy: string;
}

export async function create(prevState: any, formData: FormData): Promise<CreateResponse | ErrorResponse> {
  const schema = z.object({
    token: z.string().optional().nullable(),
  });
  let { token } = schema.parse({
    token: formData.get('token'),
  });

  const cookieStore = cookies();
  token ||= cookieStore.get('playerId')?.value;

  if (!token) {
    return { error: 'No player cookie found' };
  }

  try {
    const response = await db
      .insertInto('games')
      .values({ createdBy: token })
      .returning(['id', 'createdAt', 'createdBy'])
      .executeTakeFirst();
    return response ?? { error: 'Internal server error' };
  } catch (error) {
    console.error(error);
    return { error: 'Internal server error' };
  }
}
