import { storefront, isShopifyConfigured } from "@/lib/shopify/client";

// Typed product reads from Shopify. Shapes follow the Storefront API.

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: ShopifyImage | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  variants: ShopifyVariant[];
  availableForSale: boolean;
}

const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          handle
          title
          description
          availableForSale
          featuredImage { url altText }
          priceRange { minVariantPrice { amount currencyCode } }
          variants(first: 20) {
            edges {
              node {
                id
                title
                availableForSale
                price { amount currencyCode }
              }
            }
          }
        }
      }
    }
  }
`;

interface ProductsResponse {
  products: {
    edges: {
      node: Omit<ShopifyProduct, "variants"> & {
        variants: { edges: { node: ShopifyVariant }[] };
      };
    }[];
  };
}

/** Fetch the latest products. Returns [] until Shopify is configured. */
export async function getProducts(first = 24): Promise<ShopifyProduct[]> {
  if (!isShopifyConfigured) return [];
  const data = await storefront<ProductsResponse>(PRODUCTS_QUERY, { first });
  return data.products.edges.map(({ node }) => ({
    ...node,
    variants: node.variants.edges.map((e) => e.node),
  }));
}
