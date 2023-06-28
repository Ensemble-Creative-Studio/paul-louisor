import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {media} from 'sanity-plugin-media'
import {deskStructure} from './schemas/deskstructure'
import StudioNavbar from './app/(user)/components/StudioNavbar'
const projectId = 'kgj2ccaw';
const dataset = 'production';

export default defineConfig({
  basePath: "/studio",
  name: 'default',
  title: 'Paul Louisor',

  projectId,
  dataset,

  plugins: [    deskTool({
    structure: deskStructure,
  }), visionTool(), media() ],
  studio:{
components: {
  navbar: StudioNavbar,
}
  },

  schema: {
    types: schemaTypes,
  },
})
