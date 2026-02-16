export default function CardViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No header, no navigation - just the card
  return <>{children}</>;
}
