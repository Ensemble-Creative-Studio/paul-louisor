import {defineCliConfig} from 'sanity/cli'
const projectId = 'kgj2ccaw';
const dataset = 'production';
const version = '2022-11-15'
export default defineCliConfig({
  api: {
    projectId,
    dataset,
  
},
})
