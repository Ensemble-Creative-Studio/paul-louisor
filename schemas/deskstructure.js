import { CiSettings } from 'react-icons/ci'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
export const deskStructure = (S, context) =>
  S.list()
    .title("Content")
    .items([
      // orderableDocumentListDeskItem({type: 'pages', S, context}),
      ...S.documentTypeListItems()
      .filter((listItem) => !["siteSettings"].includes(listItem.getId()))
      .filter((template) => {
        if (template.spec.id === "media.tag") {
          return false;
        }
        return true;
      }),
      S.divider(),
      S.listItem()
        .title("Site settings")
        .icon(CiSettings)
        .child(
          S.editor().schemaType("siteSettings").documentId("siteSettings")
        ),
      // Add a visual divider (optional)

      // List out the rest of the document types, but filter out the config type

    ]);
