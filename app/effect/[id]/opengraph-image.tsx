import { getFontDataEffectFS } from '@/data/get-font-data'
import { Effect } from 'effect'
import { ImageResponse } from 'next/og'
 
// Image metadata
export const alt = 'Dynamic Effect Page'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
// This generation does NOT work as expected, likely because it is generated at runtime
export default async function DynamicImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const fonts = await Effect.runPromise(getFontDataEffectFS)
 
  return new ImageResponse(
    (
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
        }}>Dynamic Example with Effect FS: { id }</span>
        <span style={{
          fontSize: "2rem",
          textAlign: 'center',
        }}>Some text for comparison</span>
      </div>
    ),
    // ImageResponse options
    {
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