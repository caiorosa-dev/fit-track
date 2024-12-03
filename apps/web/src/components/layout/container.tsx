export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-xl w-full mx-auto h-full grid grid-rows-[auto_1fr]">{children}</div>
  );
}
