import Image from "next/image";
import { Layout } from '@/component/Layout'
import { fetchAboutPage } from '@/lib/getabout.tsx'
import { About } from '@/component/About'

export default async function Page() {

  const data = await fetchAboutPage()

  return (
 	  <Layout>
      <h1>About Paul Lieberman</h1>
        <div className="h-card warpme">
          <p>
              <span className="hidden p-name">Paul Lieberman</span>
              <span className="hidden p-nickname">lieb</span>
              <Image alt="Paul Lieberman" className="u-photo" src="/head6.png.webp" width={77} height={100} />
              <a className="hidden u-url" href="https://paullieberman.org" rel="me">Website</a>
              <a className="hidden u-email" href="mailto:lieb@paullieberman.net">eMail</a>
          </p>
          <div className="p-note">
            <About data={data[0]} />
          </div>
        </div>
    </Layout>
  );
}


