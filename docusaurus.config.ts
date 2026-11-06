import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {config as dotenvconfig}  from "dotenv"; // Importieren der dotenv-Konfiguration, um Umgebungsvariablen aus einer .env-Datei zu laden

dotenvconfig();

/* TODO: change to read configuration from environment */
const blogEnabled = Boolean(process.env.BLOG_ENABLED === 'true')
const gitRepositoryUrl = process.env.GIT_REPOSITORY_URL ?? 'https://github.com/jeromewinkler-Omega/omega-dso'; // Stringe Constante für die GitHub-Repository-URL, die aus der Umgebungsvariable gelesen wird oder einen Standardwert hat
const isDev = process.env.SHOW_DEV_LINKS === 'true'; // Boolean, der überprüft, ob die Anwendung im Entwicklungsmodus läuft



const config: Config = {
  title: 'DSO Live Blog to verify my live Project diary ', // User-Anpassung des Titels der Website
  tagline: 'Combining a relentless drive for efficiency with meticulous attention to detail, I am fully focused on transitioning into the DevSecOps landscape and mastering the challenges ahead.', // User-Anpassung des Untertitels der Website
  favicon: 'img/Omega-favicon.ico', // User-Anpassung des Pfads zum Favicon der Website

  // Set the production url of your site here
  url: process.env.DEPLOYMENT_URL ?? "https://jeromewinkler-Omega.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.BASE_URL ?? "/omega-dso/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: process.env.GITHUB_ORG ?? 'jeromewinkler-Omega', // Usually your GitHub org/user name
  projectName: process.env.GITHUB_PROJECT ?? 'omega-dso', // Usually your repo name.

  deploymentBranch: process.env.DEPLOYMENT_BRANCH ?? 'gh-pages',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:`${gitRepositoryUrl}/tree/main/`, // editUrl: 'die oben als const angegeben wurde und hier wiederverwendet wird',
        },
        blog: blogEnabled ? 
          {
            showReadingTime: true,
            feedOptions: {
              type: ['rss', 'atom'],
              xslt: true,
            },
            // Please change this to your repo.
            // Remove this to remove the "edit this page" links.
            editUrl:`${gitRepositoryUrl}/tree/main/`, // editUrl: 'die oben als const angegeben wurde und hier wiederverwendet wird', 
            // Useful options to enforce blogging best practices
            onInlineTags: 'warn',
            onInlineAuthors: 'warn',
            onUntruncatedBlogPosts: 'warn',
          }
          : false,
        theme: {
          customCss: './src/css/custom.css', // User-Anpassung des Pfads zur benutzerdefinierten CSS-Datei
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/z_nano_core_social_card_v8.png',
    navbar: {
      title: 'Omega-DSO Live Blog', // User-Anpassung des Titels in der Navigationsleiste
      logo: {
        alt: 'My Site Logo', // User-Anpassung des Alt-Textes für das Logo in der Navigationsleiste
        src: 'img/omega-logo.svg', // User-Anpassung des Logos in der Navigationsleiste
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/jeromewinkler-Omega/omega-dso', // Hinzufügen des neuen Menüpunkts "GitHub" in der Navigationsleiste
          label: 'Github',
          position: 'right',
        },
        ...(isDev
          ? [{ href: 'https://screenpal.com', label: 'ScreenPal', //      ScreenPal menu item in the navbar
              position: 'right' as const }]
          :[]),
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/guides/intro', // Menüpunkt "Tutorial" in der Fußzeile    {
              
            },
          ],
        },
        {
          title: 'Projects', // Hinzufügen des neuen Menüpunkts "Projects" in der Fußzeile
          items: [
            {
              label: 'Overview',
              to: '/docs/projects/overview',
            },
            {
              label: 'Docusaurus-Blog',
              to: '/docs/projects/docusaurus-blog', // Hinzufügen des neuen Menüpunkts "Docusaurus-Blog" in der Fußzeile
            },
            
          ],
          
        },  
        {
          title: 'More',
          items: [
              
            {
              label: 'GitHub',
              href: 'https://github.com/jeromewinkler-Omega/omega-dso', // Hinzufügen des neuen Menüpunkts "GitHub" in der Fußzeile
            },
            {
              label: 'Template',
              href: 'https://github.com/jeromewinkler-Omega/dso-blog-template', // Hinzufügen des neuen Menüpunkts "Template" in der Fußzeile
            },
            ...(isDev
              ? [{ href: 'https://screenpal.com', label: 'ScreenPal', position: 'right' as const }] 
              :[]), // Hinzufügen des neuen Menüpunkts "ScreenPal" in der Fußzeile, nur im Entwicklungsmodus
          ],
        },
        
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Z-Nano-Core. Built with Docusaurus. 💚.extended from the developer-akademie-starter  `, // User-Anpassung und extended hinzugefügt
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['powershell', 'hcl'],
      magicComments: [
        // Remember to extend the default highlight class name as well!
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: {start: 'highlight-start', end: 'highlight-end'},
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
};


if (blogEnabled) {
  (config.themeConfig.navbar as any).items.push({to: '/blog', label: 'Blog', position: 'left'});
  (
    config.themeConfig.footer as any
  ).links[2].items.push({
    to: '/blog',
    label: 'Blog',
  });
}

export default config;
