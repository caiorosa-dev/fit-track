export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-xl w-full mx-auto pt-8 space-y-8">{children}</div>
  );
}
