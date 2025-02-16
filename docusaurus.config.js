module.exports = {
  title: 'MailPace Documentation',
  tagline: 'Transactional email made easy',
  url: 'https://docs.mailpace.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'MailPace', // Usually your GitHub org/user name.
  projectName: 'MailPace.com', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'MailPace',
      logo: {
        alt: 'MailPace Logo',
        src: 'img/logo.png',
        target: '_top'
      },
      items: [
        {
          to: 'https://mailpace.com/blog',
          label: 'Blog',
          position: 'left',
        },
        {
          to: '/',
          activeBasePath: 'overview',
          label: 'Overview',
          position: 'right',
        },
        {
          to: 'reference/overview',
          activeBasePath: 'reference',
          label: 'API Reference',
          position: 'right',
        },
        {
          to: 'integrations/rails',
          activeBasePath: 'integrations',
          label: 'Integrations',
          position: 'right',
        }
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Links',
          items: [
            {
              label: 'Privacy',
              href: 'https://mailpace.com/privacy',
            },
            {
              label: 'Terms of Service',
              href: 'https://mailpace.com/terms',
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} MailPace.com`,
    },
    prism: {
      additionalLanguages: ['ruby', 'php'],
    },
    algolia: {
      appId: 'DDZLB5QA5I',
      apiKey: '6e7c8f1964c37bfa72a1904c105c1f84',
      indexName: 'ohmysmtp',

      // Optional: see doc section bellow
      contextualSearch: false,

      // Optional: Algolia search parameters
      searchParameters: {},

      //... other Algolia params
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/mailpace/docs/edit/master/',
          routeBasePath: '/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-4MPZCNP4XW',
          anonymizeIP: true,
        },
      },
    ],
  ],
  plugins: [],
};
