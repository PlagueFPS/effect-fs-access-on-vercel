import type { Metadata } from "next"

export const generateStaticParams = async () => {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ]
}

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> => {
  const { id } = await params
  return {
    title: `Dynamic Effect Page: ${id}`,
    description: 'This is a dynamic page using Effect FS access on Vercel.',
    openGraph: {
      title: `Dynamic Effect Page: ${id}`,
      description: 'This is a dynamic page using Effect FS access on Vercel.',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Dynamic Effect Page: ${id}`,
      description: 'This is a dynamic page using Effect FS access on Vercel.',
    }
  }
}

export default async function EffectDynamicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div>EffectDynamicPage: { id }</div>
  )
}
