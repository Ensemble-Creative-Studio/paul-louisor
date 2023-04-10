import * as createClient from '@sanity/client';
import { getPlaiceholder } from "plaiceholder";
import imageUrlBuilder from "@sanity/image-url";
const client = createClient({
  projectId: "kgj2ccaw",
  dataset: "production",
  token: "secret", // Make sure this is a write token
  useCdn: false,
});

async function updateSeriesImagesWithBlurDataURL() {
  // Fetch all series documents
  const seriesList = await client.fetch(`*[_type == "series"]`)

  // Loop through each series
  for (const series of seriesList) {
    // Loop through each image in the series
    for (const image of series.images) {
      const imageUrl = urlFor(image.asset).url()
      const { base64 } = await getPlaiceholder(imageUrl, { size: 4 })

      const updatedImage = {
        ...image,
        metadata: {
          ...image.metadata,
          blurDataURL: base64,
        },
      }

      await client
        .patch(series._id)
        .setIfMissing({ metadata: {} }) // Set an empty metadata object if it's missing
        .set({ 'images[_key == $imageKey]': updatedImage }, { imageKey: image._key })
        .commit()
        .then((res) => {
          console.log(`Updated image ${image._key} with blurDataURL in series ${series._id}`)
        })
        .catch((err) => {
          console.error(`Failed to update image ${image._key} in series ${series._id}: ${err.message}`)
        })
    }
  }
}

updateSeriesImagesWithBlurDataURL()
