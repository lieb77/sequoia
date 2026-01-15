/* components/Bikes */
import Image from "next/image"

export function BikesLayout({ bikes }: JSX.Element){
	return(
		<div id="bikediv">
			{bikes.map(bike  =>
        	<div key={bike.id} className='warpme'>
						<div className="grid grid-cols-2 gap-4">
							<div>
									<h2 className="big">{ bike.name }</h2>
									<p>{ bike.make } &nbsp; { bike.model }</p>
									<p>{ bike.from } &nbsp; { bike.year }</p>
									<div className="embedded-html" dangerouslySetInnerHTML={{ __html: bike.body }} />
								</div>
							<div>
							  { bike.urls.map(url =>
  						    <Image key={url} src={url} alt='Bike' width={500} height={500} className="my-2"/>
							  )}
							</div>
						</div>
					</div>
			)}
		</div>
	);
}


