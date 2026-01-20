/* /components/Tour */

export function About({data}){

  return(
    <div dangerouslySetInnerHTML={{ __html: data.body.processed }} />
  )
}

