import { redirect } from 'next/navigation';

export async function GET() {
  // We use a permanent redirect (308) for SEO or 
  // a temporary one (307) if you might change your mind later.
  redirect('/blog/All');
}
