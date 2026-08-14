/**
 * Full-viewport scene: luminous blush→paper→peach gradient with three large
 * radial blobs drifting on 65–90s loops (CSS transforms only), plus a
 * barely-there grain overlay so the gradients don't band.
 */
export default function Background() {
  return (
    <>
      <div className="bg-scene" aria-hidden="true">
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />
        <div className="bg-blob bg-blob-3" />
      </div>
      <div className="bg-grain" aria-hidden="true" />
    </>
  )
}
