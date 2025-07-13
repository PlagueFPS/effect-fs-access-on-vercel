import { getFontDataEffectFS } from '@/data/get-font-data'
import { Effect } from 'effect'
import { ImageResponse } from 'next/og'
 
// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
// This generation works as expected, probably because it is generated at build time
export default async function Image() {
  const fonts = await Effect.runPromise(getFontDataEffectFS)
 
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: "4rem",
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{
          textAlign: 'center',
          marginBottom: "1rem",
        }}>Test Example with Effect FS</span>
        <span style={{
          fontSize: "2rem",
          textAlign: 'center',
        }}>Some text for comparison</span>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: fonts ? [
        {
          name: 'Geist SemiBold',
          data: fonts.geistSemiBold,
          style: 'normal',
          weight: 600,
        },
        {
          name: 'Geist Bold',
          data: fonts.geistBold,
          style: 'normal',
          weight: 700,
        },
      ] : undefined,
    }
  )
}