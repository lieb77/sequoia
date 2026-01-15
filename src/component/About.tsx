/* /components/Tour */

export function About({data}){
console.log(data)
  return(
    <div dangerouslySetInnerHTML={{ __html: data.body.processed }} />
  )
}

