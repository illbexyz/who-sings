export interface MusixmatchResponse<T> {
  message: {
    header: {
      status_code: 200 | 400 | 401 | 402 | 403 | 404 | 405 | 500 | 503;
      execute_time: number;
    };
    body: T;
  };
}

export const MUSIXMATCH_API_KEY = process.env.MUSIXMATCH_API_KEY;

export const musixmatchApiUrl = "https://api.musixmatch.com/ws/1.1";

export function musixmatchGetBody<T>(
  musixmatchResponse: MusixmatchResponse<T>
): T {
  return musixmatchResponse.message.body;
}
