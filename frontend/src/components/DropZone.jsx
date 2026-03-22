export default function DropZone({ dragging, onDrop, onDragOver, onDragLeave, onFileInput, inputRef }) {
  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={`w-full max-w-2xl rounded-2xl border-2 border-dashed transition-colors duration-200 flex flex-col items-center justify-center gap-3 sm:gap-4 py-8 sm:py-14 px-4 sm:px-6 cursor-pointer
        ${dragging
          ? 'border-violet-400 bg-violet-50'
          : 'border-gray-300 bg-gray-50 hover:border-violet-500 hover:bg-violet-50'
        }`}
      onClick={() => inputRef.current?.click()}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 sm:w-12 h-10 sm:h-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
      <p className="text-gray-600 text-sm sm:text-base text-center">Drag and drop files here or</p>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
        className="px-5 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
      >
        Upload Files
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={onFileInput}
      />
    </div>
  )
}
