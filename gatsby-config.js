module.exports = {
  siteMetadata: {
    title: `David Vargas`,
    author: {
      name: `David Vargas`,
      summary: `The site is under construction, check back later!`,
    },
    description: `David Vargas' Online Home`,
    siteUrl: `https://davidvargas.me/`,
    projects: {
      current: [
        {
          title: "Mark43",
          link: "https://mark43.com",
          description: `
              My last internship while in college and my first full time job while out. 
              The company aims to empower communities and governments to improve public safety.
              I get to work with a bunch of incredible people; some of my earliest mentors I've met
              through working here. It was also the first time where I learned I care about more
              than just coding. The company's growth and mission statement to improve an industry in
              desperate need of innovation are now two things I deeply value when deciding what to work
              on next.
          `,
          imgSrc: "mark43.jpg",
        },
        {
          title: "Longwave",
          link: "https://longwave.app",
          description: `
              A journal sharing app, spear headed by my good friend Kenny Friedman (https://kennethfriedman.org/).
              What started as a school project that I worked on and never touched after, Kenny took over and is 
              making tremendous progress. It has inspired me to help out again, but under his vision. The premise 
              is that you form a group with friends and up to once a day, journal about whatever's on your mind. The 
              next morning, you will get an email with everyone who journaled the previous day. We view it as a new
              take on social media - a more thoughtful way to keep in touch with friends or family.
          `,
          imgSrc: "longwave.png",
        },
      ],
    },
    interests: {
      coreBeliefs: [
        {
          title: "Enlightened Self-Interest",
          description:
            "This principle states that acting in the best interest of others is actually in our own best self interests. So serving others is basically the most selfish thing we could do!",
        },
        {
          title: "Don't Attribute to Malice",
          description:
            "Almost everything we attribute to malice more often than not could be attributed to ignorance. Understand why we act a certain way and discover how our premises differ.",
        },
        {
          title: "Happiness Lies in Growth",
          description:
            "Becoming rich brings a lot more joy than being rich. This applies to all things, not just money. So constantly look for ways to grow and learn.",
        },
        {
          title: "Any System Can Be Gamed",
          description:
            "The world runs on systems, it's how we've achieved great progress in society. The most robust systems are ones that thrive despite being gamed, not by avoiding it.",
        },
        {
          title: "Honesty and Transparency",
          description:
            "Always opt to be as honest and transparent as humanly possible. What seems painful in the short term, will pale in comparison to the pain we experience long term.",
        },
      ],
      books: [{
        title: "Drive",
        author: "Daniel Pink",
        description: "Pink explores human motivation, and argues we need to evolve past the current carrot-stick model of motivation into intrinsic motivators. Book was an astounding mindshift for me in how I thought about human behavior."
      },{
        title: "The Infinite Game",
        author: "Simon Sinek",
        description: "Our institutions today operate more often than not with a finite mindset: increasing the bottom line or winning the next election. Sinek argues, quite compellingly, that the best organizations are ones who operate with an infinite mindset."
      },{
        title: "Enlightenment Now",
        author: "Steven Pinker",
        description: "Before this book, I had a blind optimism about the world. Pinker shows with data spanning hundreds of years that this optimism isn't blind; humanity has been and will continue to progress and prosper."
      }]
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/content/projects`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/favicon-32x32.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-typescript`,
  ],
};
