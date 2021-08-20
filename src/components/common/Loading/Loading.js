import { CircularProgress } from "@material-ui/core";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-20 w-full">
      <CircularProgress color="primary" />
    </div>
  );
}
