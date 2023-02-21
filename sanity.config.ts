import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {media} from 'sanity-plugin-media'
import {deskStructure} from './schemas/deskstructure'
import StudioNavbar from './app/(user)/components/StudioNavbar'
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

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
