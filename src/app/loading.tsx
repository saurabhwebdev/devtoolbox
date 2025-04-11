export default function Loading() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh]">
      <div className="space-y-4 text-center">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-primary border-opacity-20 rounded-full animate-spin"></div>
        </div>
        <p className="text-xl font-medium text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
} 