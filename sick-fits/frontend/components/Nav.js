import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <Link href="/products" />
      <Link href="/sell" />
      <Link href="/orders" />
      <Link href="/account" />
    </nav>
  );
}
