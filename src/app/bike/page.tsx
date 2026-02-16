// src/app/bike/page.tsx
import { Layout } from '@/components/Layout'
import { getBikePage } from './_lib/getbikepage'
import { parseHtml } from '@/lib/utils'
import Image from 'next/image'

export default async function BikePage() {
    const html = await getBikePage()
    const content = parseHtml(html)

    return (
        <Layout>
            <div className="items-center justify-center min-h-screen p-4 ">
                <section className="w-full py-12">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Column 1: First Image */}
                        <div className="flex-1 w-full">
                            {content.images[0] ? (
                                <Image
                                    src={content.images[0]}
                                    width={640}
                                    height={480}
                                    alt="Bike visual primary"
                                    className="rounded-xl shadow-lg object-cover"
                                />
                            ) : (
                                <div className="w-full h-[480px] bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                                    No image found
                                </div>
                            )}
                        </div>

                        {/* Column 2: First Paragraph */}
                        <div className="flex-1 w-full prose prose-slate bg-dark-glass text-white p-4 rounded">
                            <p className="text-lg leading-relaxed">
                                {content.paragraphs[0] ||
                                    'No description available for this model.'}
                            </p>
                        </div>

                        {/* Column 3: Second Image */}
                        <div className="flex-1 w-full">
                            {content.images[1] ? (
                                <Image
                                    src={content.images[1]}
                                    width={640}
                                    height={480}
                                    alt="Bike visual secondary"
                                    className="rounded-xl shadow-lg object-cover"
                                />
                            ) : (
                                <div className="w-full h-[480px] bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                                    No secondary image found
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                <div className="items-center justify-center min-h-screen p-4">
                    <Image
                        src={content.images[2]}
                        width={640}
                        height={480}
                        alt="Bike visual secondary"
                        className="rounded-xl shadow-lg object-cover"
                    />
                </div>
            </div>
        </Layout>
    )
}
