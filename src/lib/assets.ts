const FALLBACK_ASSETS_BASE_URL =
  "https://npimppcbacqkpbkvjlxz.supabase.co/storage/v1/object/public/wedding-assets/images";

function normalizeBaseUrl(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function getPublicAssetsBaseUrl() {
  return normalizeBaseUrl(
    process.env.NEXT_PUBLIC_ASSETS_BASE_URL || FALLBACK_ASSETS_BASE_URL,
  );
}

export function assetUrl(filename: string) {
  const cleanFilename = filename.replace(/^\/+/, "");
  return `${getPublicAssetsBaseUrl()}/${cleanFilename}`;
}
