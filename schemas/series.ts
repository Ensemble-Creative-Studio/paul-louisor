import { MdOutlinePhotoCamera as icon} from 'react-icons/md';


export default {
  name: 'series',
  title: 'Series',
  icon,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'date',
      title: 'Date',
      type: 'string'
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }
  ]
}
