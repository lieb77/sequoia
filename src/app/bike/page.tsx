// src/app/bike/page.tsx
import { getBikePage } from './_lib/getbikepage'
import { parseHtml } from '@/lib/utils'
import Image from 'next/image'

export default async function BikePage() {
    const html = await getBikePage()
    const content = parseHtml(html)

    return (
            <div className="items-center justify-center min-h-screen p-4 ">
                <section className="w-full">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Column 1: First Image */}
                        <div className="flex-1 w-full">
                                 <Image
                                    src={content.images[0]}
                                    width={640}
                                    height={480}
                                    alt="Riding my bike"
                                    className="rounded-xl shadow-lg object-cover"
                                />
                                <p className="bg-dark-glass text-center">On a local road ride</p>
                           </div>

                        {/* Column 2: First Paragraph */}
                        <div className="flex-1 w-full prose prose-slate bg-dark-glass text-white p-4 rounded">
                            <p className="text-lg leading-relaxed">
                                {content.paragraphs[0]}
                            </p>
                             <p className="text-lg leading-relaxed">
                                {content.paragraphs[1]}
                            </p>
                              <Image
                        src={content.images[2]}
                        width={640}
                        height={480}
                        alt="Collage of state welcome signs from my bicycle tours"
                        className="rounded-xl shadow-lg object-cover my-2"
                    />
                     <p className="bg-dark-glass text-center">Some state welcome signs from my bicycle tours.</p>
                        </div>

                        {/* Column 3: Second Image */}
                        <div className="flex-1 w-full">
                                <Image
                                    src={content.images[1]}
                                    width={640}
                                    height={480}
                                    alt="Riding my bike on the Oregon Outback"
                                    className="rounded-xl shadow-lg object-cover"
                                />
                                 <p className="bg-dark-glass text-center">On the Oregon Outback in 2022</p>
                        </div>
                    </div>
                </section>
                <div className="place-items-center justify-center min-h-screen p-4">
                  
                           
                </div>
            </div>
    )
}
