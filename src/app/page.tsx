// /app/page.tsx
import { Layout } from '@/component/Layout'
import Image from 'next/image'
export default function Home() {
  return (
 	<Layout>
      <main className="warpme narrow">
        <Image src="/surreal1.jpg" alt="Surreal" width={1024} height={768} />
        <p>This stite is built on a Nodejs/Nextjs/React stack and pulls data from my Drupal site. You can see all of the same data at <a className="oldstyle" href="https://paullieberman.org"> my main website</a>. You will notice the data is displayed very differenctly here. This platform allows for building more dynamic experiences than within Drupal. At least in theory.
        </p>
      </main>
    </Layout>
  )
}
