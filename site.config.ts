import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: '3acb3e66e79f838f888881637088a6f6',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: 'Personal Blog',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'localhost:3000',
  author: 'Yoke Xiong',

  // open graph metadata (optional)
  description: 'Writing, notes, and updates from Yoke Xiong.',

  // social usernames (optional)
  twitter: process.env.NEXT_PUBLIC_TWITTER_USERNAME || undefined,
  github: process.env.NEXT_PUBLIC_GITHUB_USERNAME || undefined,
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_USERNAME || undefined,
  // mastodon: '#', // optional mastodon profile URL, provides link verification
  // newsletter: '#', // optional newsletter URL
  // youtube: '#', // optional youtube channel name or `channel/UCGbXXXXXXXXXXXXXXXXXXXXXX`

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: true,

  // whether or not redis is enabled for caching generated preview images (optional)
  // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
  // environment variables. see the readme for more info
  isRedisEnabled: false,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  // pageUrlOverrides: {
  //   '/foo': '067dd719a912471ea9a3ac10710e7fdf',
  //   '/bar': '0be6efce9daf42688f65c76b89f8eb27'
  // }
  pageUrlOverrides: {
    '/about': 'c20b3e66e79f830dadbe814c57c1ce66',
    '/archive': '619b3e66e79f824ebfd68198ae25db09',
    '/recents': 'd29b3e66e79f8217a4b5012875d14194'
  },
  pageUrlAdditions: {
    '/gallery': '619b3e66e79f824ebfd68198ae25db09'
  },

  // whether to use the default notion navigation style or a custom one with links to
  // important pages. To use `navigationLinks`, set `navigationStyle` to `custom`.
  navigationStyle: 'custom',
  navigationLinks: [
    {
      title: 'About',
      pageId: 'c20b3e66e79f830dadbe814c57c1ce66'
    },
    {
      title: 'Gallery',
      url: '/gallery?v=463b3e66e79f826782b008305d6ea0f8'
    },
    {
      title: 'Archive',
      pageId: '619b3e66e79f824ebfd68198ae25db09'
    },
    {
      title: 'Recents',
      pageId: 'd29b3e66e79f8217a4b5012875d14194'
    }
  ]
})
