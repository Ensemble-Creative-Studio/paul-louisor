import "../../styles/globals.css";
import { groq } from "next-sanity";
import { client } from "../../lib/sanity.client";




export default  function RootLayout({
  
  children, 
}: {
  children: React.ReactNode
}) 
{

  
    return (
    <html>
      <head />

      <body className="coucou">

      {/* <Header posts={posts} /> */}
        {children}
        </body>
    </html>
  )
}
