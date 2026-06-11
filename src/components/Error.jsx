function Error({ error, setError }) {
  return (
    <div className="fixed top-5 right-5 z-50">
      <div className="flex items-center gap-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-md min-w-80">
        <div className="flex-1">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>

        <button
          onClick={() => setError("")}
          className="text-red-500 hover:text-red-700 font-semibold cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default Error;
