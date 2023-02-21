
import { useRouter } from "next/router";
interface HeaderProps {
  title: string;
  navigation: string[];
}

export default function Contact({ header }: { header: any }) {
    return (
      <div className="md:block  fontSize transitionEasingContact contactBloc flex justify-between flex-col pl-8 absolute bottom-8 -z-10 translate-y-3/4 invisible ">
        <div>
        {header &&
          header.Contact.map((item: any) => {
            if (item._type === "block") {
              const text = item.children
                .filter((child: any) => child._type === "span")
                .map((child: any) => child.text)
                .join(" ");
              const links = item.markDefs
                .filter((mark: any) => mark._type === "link")
                .map((mark: any) => mark.href);
  
              return (
                <div key={item._key} className ='pt-4'>
                  {links.length > 0 ? (
                    <a
                      key={links[0]}
                      href={links[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {text}
                    </a>
                  ) : (
                    <p>{text}</p>
                  )}
                </div>
              );
            }
          })}
        {(!header || header.length === 0) && <p>No contact information available.</p>}
        </div>
  <div className="pt-8 ">
  {header &&
          header.SiteBy.map((item: any) => {
            if (item._type === "block") {
              const text = item.children
                .filter((child: any) => child._type === "span")
                .map((child: any) => child.text)
                .join(" ");
              const links = item.markDefs
                .filter((mark: any) => mark._type === "link")
                .map((mark: any) => mark.href);
  
              return (
                <div key={item._key}>
                  {links.length > 0 ? (
                    <a
                      key={links[0]}
                      href={links[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {text}
                    </a>
                  ) : (
                    <p>{text}</p>
                  )}
                </div>
              );
            }
          })}
        {(!header || header.length === 0) && <p>No contact information available.</p>}
  </div>
      </div>
    );
  }
  