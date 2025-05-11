export default function BackgroundGradient() {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800" />
      <div className="absolute inset-0 opacity-50">
        <div className="h-full w-full bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>
    </div>
  )
}

