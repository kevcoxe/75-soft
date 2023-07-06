// utils/getURL.ts
const IS_SERVER = typeof window === "undefined";
export default function getURL(path: string) {
  const baseURL = IS_SERVER
    ? process.env.NEXT_PUBLIC_SITE_URL!
    : window.location.origin;

  console.log(`path: ${path}`)
  console.log(`baseURL: ${baseURL}`)

  return new URL(path, baseURL).toString();
}
