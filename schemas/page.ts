import { HiOutlineDocumentText as icon} from 'react-icons/hi';
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
export default {
    name: 'pages',
    title: 'Pages',
    icon,
    type: 'document',
    orderings: [orderRankOrdering],
    fields: [

      {
        name: 'pageName',
        title: 'Page Name',
        type: 'string'
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'pageName',
          maxLength: 96,
        },
      },
      {
        name: 'ImageDesktop',
        description: 'Here you can select the image displayed on the home for the desktop',
        title: 'Image Dektop',
        type: 'image',
      },
      {
        name: 'ImageMobile',
        description: 'Here you can select the image displayed on the home for the mobile',
        title: 'Image Mobile',
        type: 'image',
      },

      {
        name: 'slides',
        title: 'Slides',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [
              {
                type: 'series'
              }
            ]
          }
        ]
      },
      orderRankField({ type: "document" }),
    ]
  }
  