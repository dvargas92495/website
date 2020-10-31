---
title: "Dogfood Doesn't Always Taste Good"
date: "2020-10-30T22:45:55.000Z"
description: "The benefits and drawbacks I've experienced being my own user."
acknowledgement: Philip Thomas, Stew Fortier, Compound Writing
tags: Roam, Productivity, Software Engineering, Feedback, React
---

Dogfooding is the practice of using the tools you build. Tech companies often attribute their success to this idea. What better problem to solve than your own!

One example is Facebook. React, the software engineers responsible for redesigning the company's entire front end, cite dogfooding as one of their [core design principles](https://reactjs.org/docs/design-principles.html#dogfooding). They argue that by solving problems raised by Facebook's product teams their "vision stays sharp and [they] have a focused direction going forward."

I am a user of the tools I work on. To kick off my solopreneur career, I started building extensions on [roamjs.com](https://roamjs.com) for the Roam community. And while having an inside perspective has motivated me to produce consistently, that same bias tunnel visioned me early on.

Dogfooding your tools isn't strictly positive. I will talk about when I've seen it help and when I've seen it hurt my work so far.

## Tastes Good As A First Course
Starting a new project is daunting. Initial planning is often filled with hundreds of features that you want to implement. Dogfooding helps narrow your focus.

When I first started building Roam extensions, I was inspired by RoamHacker's [Roam42](https://roamresearch.com/#/app/roamhacker/page/UeoxCm8rm) project. I thought I could build an equally capable library of tools. But where do I start? I looked at my daily note page and saw how I had pasted my meetings for the day from google calendar. I decided, "ok let's just make this part easier".

Using the import Google calendar feature every day motivated me to do the next extension. I was writing an article where I copy and pasted an emoji from another app into Roam. "That was dumb, why can't I just type emojis?" This led me to building the emoji extension.

Sharing these two extensions with the community helped me build momentum. It allowed me to start building practices like my branch strategy and conventions like using Roam buttons that made building future extensions easier. Being your own user is incredibly valuable for informing where to start. 

## The Inside Scoop
Dogfooding not only informs what to work on, but how the work should be designed.

At my last job, I worked on building a record management system for police officers. Projects were dictated by our product managers. Because I rarely interacted with our users, and because I didn't actually use what I was building, I didn't realize how hard it was to use our app.

I was invited to a training to help onboard officers onto our platform. My eyes blew up when I saw how long it was taking users to file a report. Fields that were confusing, related information scattered across the page, and redundant information requested multiple times all contributed to an underwhelming user experience. They were all symptoms of working with fake data and skipping important user workflows during debugging.

Today I get to experience first hand the design decisions I make with my extensions. It has led to the button pattern for importing data and using attributes for extension configuration. It has led to building icons that are consistent with the rest of Roam's UI.

It is also cluing me into how I want to make them easier to use. Installing new extensions is still confusing. Inserting data into bullets is still inconsistent and jarring. But because I have the inside scoop on what the user experience is like, they will have higher priority than other non user facing tasks like tech debt.

## When Dogfooding Goes Sour
When you use your own tools, it's easy to only consider your own tastes. This can lead to poor design decisions.

I love using Roam as a central task manager. Consequently, I really wanted to integrate my engineering work from GitHub. This would save me from having to manually keep the two services in sync when planning my day, and instead have a single view. The problem was that I was the only person I knew who wanted this.

The extension I created as a result was hard to use. Button text was used as parameters describing which repository to read from. Output for GitHub cards, issues, and repositories all were in-lined differently. All these design decisions stemming from the fact that I was pigeonholed into my own way of working and did not seek out interest from other engineers who used Roam. So when I finally released the extension, it got little to no user engagement.

This showed the biggest gotcha with being your own user. It's tempting to get so swept away with your own problems that you're blinded to problems other users could be facing. It also could lead to design decisions that make it only easy for __you__ to use, making it less likely that others use what you created too.

## How To Spice It Up

To fight your bias, reach out to users early and often. 

My first roam extension that got a sizable amount of user engagement was [sorting linked references](https://roamjs.com/docs/extensions/sort-references/):

https://twitter.com/dvargas92495/status/1306288721852014592?s=20

How did I decide to work on this extension? I sent out a Twitter poll to my followers to get a sense of what feature they would use:

https://twitter.com/dvargas92495/status/1305224412317265920?s=20

Even with only 18 responses to the poll, it helped guide what I should have worked on against my own intuition. I personally have no use for the sorting references feature. Without asking the Roam community directly, it probably would have taken months for me to decide to work on this particular extension. Breaking out of this bias introduced me to the first sign of success.

Now that I'm gaining some recognition within the Roam community, I'm constantly talking to users to get a sense of what feature would be most valuable. I could rely on them to prioritize my work against my own intuition. Sometimes my bias still seeps in, like when I choose which four ideas to place on the poll to begin with. But I'm continually trying to figure out ways to fight this bias by prioritizing other user requests onto the poll instead of my own.

In summary, there is a ton of appeal about being your own user. It helps to inspire initial motivation and gives you a deeper appreciation of the user experience. However, watch out for your biases in brainstorming. Continually fight it by incorporating user feedback as often and as early as possible. 
