import { RiSettings3Fill as icon } from "react-icons/ri";
import blockContent from "./blockContent";

export default {
    name: 'siteSettings',
    title: 'Site Settings',
    icon,
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Site Title',
        type: 'string'
      },
      {
        name: 'Subtitle',
        title: 'Site Sub Title',
        type: 'string'
      },
      {
        name: 'description',
        title: 'Site Description',
        type: 'text'
      },
      {
        name: 'Contact',
        title: 'Contact',
         type: 'blockContent'
         
      },
      {
        name: 'images',
        title: 'Images',
        type: 'array',
        description:'The first 2 images will be the ones on the mobile version',
        validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): { (): any; new(): any; max: { (arg0: number): any; new(): any; }; }; new(): any; }; }; }) => Rule.required().min(3).max(5),

        of: [
          {
            type: 'image',
            
            options: {
              hotspot: true
            }
          }
        ]
      },
      {
        name: 'SiteBy',
        title: 'Site by',
         type: 'blockContent'
      }

    ]
  }