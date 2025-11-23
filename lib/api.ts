/**
 * Helper function to construct API URLs with the correct basePath
 * This ensures all API calls work correctly when the app is served from a subdirectory
 */
export function getApiUrl(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/i18n';

  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // Return the full API path with basePath
  return `${basePath}${normalizedPath}`;
}

/**
 * Wrapper around fetch that automatically adds the basePath to API calls
 */
export async function apiFetch(path: string, options?: RequestInit): Promise<Response> {
  return fetch(getApiUrl(path), options);
}
