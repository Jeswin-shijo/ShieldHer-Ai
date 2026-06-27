import { router, type Href } from 'expo-router';

/**
 * Navigate to a route stored as a plain string in mock data.
 *
 * We keep route fields as `string` (not `Href`) so the data layer type-checks
 * before expo-router generates its typed-route definitions. The cast is safe:
 * every generated `Href` literal is a subtype of `string`.
 */
export function navigate(href: string) {
  router.push(href as Href);
}

export function replaceTo(href: string) {
  router.replace(href as Href);
}

export function goBack() {
  if (router.canGoBack()) router.back();
}
