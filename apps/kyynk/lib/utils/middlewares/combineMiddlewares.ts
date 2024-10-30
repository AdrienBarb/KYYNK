import { NextRequest, NextResponse } from 'next/server';

export function combineMiddlewares(...middlewares: any[]) {
  return async (req: NextRequest): Promise<NextResponse> => {
    for (const middleware of middlewares) {
      const response = await middleware(req);
      if (response) {
        return response;
      }
    }
    return NextResponse.next();
  };
}
