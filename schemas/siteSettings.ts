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
        name: 'SiteBy',
        title: 'Site by',
         type: 'blockContent'
      }

    ]
  }