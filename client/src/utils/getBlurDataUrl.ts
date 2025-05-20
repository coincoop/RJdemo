import { getPlaiceholder } from 'plaiceholder'

export async function getBlurDataUrl(imageUrl: string) {
  const buffer = await fetch(imageUrl).then(res => res.arrayBuffer())
  const { base64 } = await getPlaiceholder(Buffer.from(buffer))
  return base64
}