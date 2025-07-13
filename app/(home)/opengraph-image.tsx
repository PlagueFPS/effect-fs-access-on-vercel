import { getFontData } from '@/data/get-font-data'
import { Effect } from 'effect'
import { ImageResponse } from 'next/og'
 
// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
// Image generation
export default async function Image() {
  const fonts = await Effect.runPromise(getFontData)
 
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
          fontSize: "6rem",
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: "1rem",
        }}>Working Example</span>
        <span style={{
          fontSize: "2rem",
          fontWeight: 600,
          textAlign: 'center',
        }}>Some text to compare against</span>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: fonts ? [
        {
          name: 'Geist-SemiBold',
          data: fonts.geistSemiBold,
          style: 'normal',
          weight: 600,
        },
        {
          name: 'Geist-Bold',
          data: fonts.geistBold,
          style: 'normal',
          weight: 700,
        },
      ] : undefined,
    }
  )
}