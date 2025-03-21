import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = [process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL];

type Handler = (
  req: NextRequest,
  ...args: any[]
) => Promise<NextResponse> | NextResponse;

export function withAdminSecret(handler: Handler) {
  return async (req: NextRequest, ...args: any[]) => {
    const origin = req.headers.get('origin') || '';

    if (req.method === 'OPTIONS') {
      return NextResponse.json(null, {
        headers: {
          'Access-Control-Allow-Origin': allowedOrigins.includes(origin)
            ? origin
            : '',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'X-ADMIN-SECRET-KEY, Content-Type',
        },
      });
    }

    if (!allowedOrigins.includes(origin)) {
      return NextResponse.json({ error: 'CORS Not Allowed' }, { status: 403 });
    }

    const secretKey = req.headers.get('X-ADMIN-SECRET-KEY');
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await handler(req, ...args);

    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set(
      'Access-Control-Allow-Headers',
      'X-ADMIN-SECRET-KEY, Content-Type',
    );

    return response;
  };
}
