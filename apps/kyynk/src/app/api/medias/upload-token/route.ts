import { NextRequest, NextResponse } from 'next/server';
import apiVideoClient from '@/lib/api-video/client';
import { strictlyAuth } from '@/hoc/strictlyAuth';

export const GET = strictlyAuth(async (req: NextRequest) => {
  try {
    const tokenResponse = await apiVideoClient.uploadTokens.createToken();

    if (!tokenResponse.token) {
      return NextResponse.json(
        { error: 'Failed to generate upload token' },
        { status: 500 },
      );
    }

    return NextResponse.json({ uploadToken: tokenResponse.token });
  } catch (error) {
    console.error('Error generating upload token:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
});
