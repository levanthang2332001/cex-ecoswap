import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'oa1b191l',
  dataset: 'production',
  apiVersion: 'v1',
  token:
    'skveYl4owyAbxGwkiW5ICknjnRqnAcvcXEF9IkqTjWPiNR9ptdd5FyiocHRYSObppA6ElSxDtFSgsVPwssxzDIJZtv5hkPxQZ2vWXRUi3enIyDiWEE2AS6kLCjPNFkptiznWHs6VP1XrnbEAYMcButEEAj5KQlIz8bTVpHcI3JBAEVemckzY',
  useCdn: true,
})
