export default function ImageSkeleton() {
  return (
    <div className="absolute inset-0 bg-medium">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 shimmer" />
      </div>
    </div>
  );
}
