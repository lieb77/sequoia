/* /components/Tour */
import Image from "next/image";

import styles from "./about.module.css"

export function About({data}){

	return(
	<div className={styles.aboutPage}>
		<h1>About Paul Lieberman</h1>
		<div className={styles.hCard}>
			<p>
			<span className={styles.pName}>Paul Lieberman</span>
			<span className={styles.pNickname}>lieb</span>
			<Image className={styles.uPhoto}  alt="Paul Lieberman" src="/head6.png.webp" width={77} height={100} />
			<a className={styles.uUrl} href="https://paullieberman.org" rel="me">Website</a>
			<a className={styles.uEmail} href="mailto:lieb@paullieberman.net">eMail</a>
			</p>
			<div className={styles.pNote}>
				<div dangerouslySetInnerHTML={{ __html: data.body.processed }} />
			</div>
		</div>
	</div>	
  )
}

