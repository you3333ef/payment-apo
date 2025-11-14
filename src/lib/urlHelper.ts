/**
 * Helper functions to generate full URLs from relative paths
 */

export const getFullUrl = (path: string): string => {
  // في المتصفح: استخدام النطاق الحالي
  const baseUrl = import.meta.env.VITE_BASE_URL || `${window.location.protocol}//${window.location.host}`;
  return `${baseUrl}${path}`;
};