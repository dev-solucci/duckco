// Minimal Shopify Storefront API client. Reads products from the store so the
// site is the custom storefront. Configured by env vars (see
// docs/commerce-shopify.md); until then the site keeps using local drop data.

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = "2025-10";

export const isShopifyConfigured = Boolean(DOMAIN && TOKEN);

/** Run a Storefront GraphQL query. Throws if Shopify is not configured. */
export async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  if (!DOMAIN || !TOKEN) {
    throw new Error("Shopify is not configured");
  }

  const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    // Cache product reads briefly; tune later.
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Shopify Storefront error: ${res.status}`);
  }

  const json = (await res.json()) as { data: T; errors?: unknown };
  if (json.errors) {
    throw new Error(`Shopify Storefront query error`);
  }
  return json.data;
}
