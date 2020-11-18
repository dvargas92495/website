---
title: "No. This Should NOT Be Native to Roam"
date: "2020-11-18T09:12:44.000Z"
description: "My rebuttal to the most common complaint I see in Roamcult Twitter"
acknowledgement: Stew Fortier, Joshua Mitchell, Michael Koutsoubis, Compound Writing
tags: Simplicity, Priority, Community, Features, Google
---

One of the most popular replies I get after releasing a [RoamJS](https://roamjs.com/) extension on Twitter is something to the effect of "Wow! This feature should be Native to Roam!"

Here's one from my good friend Josh:

https://twitter.com/joshacheson/status/1311456868942962688?s=20

And another one:

https://twitter.com/OGreenius/status/1321833308498522112?s=20

I understand the frustration. External scripts have a higher barrier to entry because they lack the trust you've established with the primary product. There also exists a significant FOMO in discovering a feature that other power users have been taking advantage of while you were left in the dark.

Despite recognizing why users are frustrating, I disagree with the sentiment. The approach the Roam team has taken to make a simple and extensible app is one of its strongest assets. There are three reasons why - simplicity, priority, and community.

## Simplicity

When was the last time you tried to use Yahoo? Was your immediate reaction "there's so much stuff here, what do I do"?

Now think about Google. It has a single search field. You fire up the app and know what to do - type a search query in the text field. From there, you have access to the world's knowledge through the internet. 

![_Comparing Yahoo's and Google's home pages_](./search.png)

The most effective apps are ones that are the simplest to get started. They become more powerful when they allow users to build extensions on top of them. Google Chrome has a simple, straight forward use case with thousands of available extensions that could fulfill thousands of unique use cases.

Roam has taken the same approach. They're brought a simple interface with one fundamental feature: networked note-taking. With just writing notes and backlinks, you could transform how you take notes from the archaic hierarchical model to the more natural networked thought model. The simplicity makes it approachable for anyone to get started using Roam. 

As users become comfortable with Roam, they start to develop workflows. These personal workflows lead to personal problems that are relevant to some but not all users. This is where extensions come in. Users can install the extensions that empower their specific use cases as their usage of the product evolves.

If these extensions were native to Roam, it could bloat the product. It risks making the product harder to understand, slower to use, and longer to get comfortable. With features installable instead of native to the platform, the vision of Roam's primary use case becomes clearer to users. 

One should not install all possible extensions. That's like saying one should download all the apps from the app store to your phone. Instead, develop your workflows in Roam and take note of when a roadblock arises. Resist installing new extensions until it is relevant for resolving one of these roadblocks.
 
## Priority

At first glance, some features appear to be low hanging fruit. They make it tempting for users to say "why don't you just implement it?" Sort icons, emojis, and integrations are common in numerous apps. What's taking Roam so long?!

Developing a feature to the standard that web applications are expected of today takes several man-hours. Any given feature brings with it hours of brainstorming, user research, design, implementation, and testing. A simple sort button could take a week to bring to production at some companies.

But, the biggest cost of chasing low hanging fruit features is not the time investment. It's the opportunity cost of what you _don't_ get to implement. Time spent on one feature means that others are not implemented. With Roam's current team size, prioritization becomes essential in deciding what subset of inbound requests are worth pursuing.

[Bardia Pourvakil](https://twitter.com/thepericulum), community manager from Roam, runs multiple office hours through Zoom with current users. In one from August, he mentioned that the team is looking to prioritize what they consider to be "unsolved problems", instead of the solved ones like a mobile client or other UI elements.

Right now, the Roam team is working on making a public backend API. This will blow the doors open on all the possible integrations and services the community will be able to build on top of it. We as the community could take advantage of this to tackle the solved problems. This will give the Roam team the resources they need to explore unsolved problems that include offline mode and multiplayer.  

## Community

Why does the [#roamcult](https://twitter.com/search?q=roamcult&src=typed_query) itself exist? How was the team able to inspire a passionate group of people to engage with the product to the degree where the users have their own Twitter hashtag?

There are multiple reasons for this success. I want to highlight the way they invited the community to contribute to the Roam ecosystem.
 
One of the best ways I've seen to foster an engaging community is to empower its members to contribute to it. Node.js took off because NPM made it easy to contribute and share packages with other developers. Reddit is popular because each subreddit is made of content created by the community. 

Roam enabled this same dynamic by first introducing `[[roam/css]]`. Members of the community were able to create and share custom themes catering the platform towards their tastes. This inspires the community to engage far more with the product than if Roam rolled out new themes.

Then they introduced `[[roam/js]]`. This led to the rise of custom extensions that are similar to Google Chrome extensions in that they are run _within Roam_. No matter what device you're on, your graph will have the extra functionality. This has led to projects like [Roam42](https://roam42.com) and [RoamJS](https://roamjs.com).

One could point out that it's in my incentive to say that features that I'm building should not be native to Roam. I argue the opposite. I'd be ecstatic if any of my tools become core to the product. It would mean less code for me to maintain and more time to spend on more interesting problems. Extensions allow developers like me to interact with many other people within the community. They are a means to an end, not an end in of themselves.

The next time you come across a feature that you feel should have been core to the product, consider the alternative. How much simpler is the product without it? What is the team working on instead? How much more engagement is there now in the community? I am then thankful that certain features are not native to Roam.
