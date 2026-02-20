// src/componets/hCard.tsx

export default function hCard() {

	return (
		<div className="h-card hidden">
			<p>
				<img className="u-photo" src="head6.png.webp" alt="Head shot" width="77" height="100" />
			</p>
			<p className="p-name">Paul Lieberman</p>
			<p className="p-nickname">lieb</p>
			<p>
				<a className="u-url" href="https://paullieberman.org" rel="me">Website</a> 
				<a className="u-email" href="mailto:lieb@paullieberman.org">email</a>
			</p>
			<p className="p-note">Ride Bikes, Play Muisc, Grow Gardens, Build Websites</p>
			<p>
				<a className="u-url" href="https://bsky.app/profile/paullieberman.org">Bluesky</a> 
				<a className="u-url" href="https://drupal/org/u/lieb">Drupal</a> 
				<a className="u-url" href="https://github.com/lieb77">GitHub</a> 
				<a className="u-url" href="https://www.facebook.com/lieb77">Facebook</a>
			</p>
		</div>
	)
}