export default async function EffectDynamicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div>EffectDynamicPage: { id }</div>
  )
}
