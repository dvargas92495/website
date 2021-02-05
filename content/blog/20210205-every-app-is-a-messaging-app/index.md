---
title: "Every App is a Messaging App"
date: "2021-02-05T09:19:54.000Z"
description: "My argument for shifting focus away from building instant message aggregators."
tags: Beeper, Slack, Discord, Email, REST
---

I recently listened to [two](https://anchor.fm/hackernews/episodes/22-Jan-20--2021-ep86cc) [different](https://dailytechnewsshow.com/2021/01/21/the-only-way-to-win-is-not-play-dtns-3951/) podcast episodes that talked about a new all in one messaging app. [Beeper](https://www.beeperhq.com/) is a unified inbox for all of your chat apps, including Slack, Messenger, Discord, WhatsApp, and so much more.


Instant message aggregation isn't a new idea. [Several](https://medium.com/@taylorwong232/5-best-all-in-one-messengers-you-should-start-using-today-3824eae71501) [other](https://www.slant.co/topics/9411/~unified-messenger-apps) products are trying to achieve the same goal. The promise they are building towards _feels_ appealing. Imagine having just the one chat app that aggregated all of your notifications instead of the many you currently have open on your laptop.

No more having to think through which app to open first before messaging someone! No more having to create _another_ account to communicate!

The promises seem enticing, particularly to a few friends I have who dream of fusing all of their messaging applications into one. But I'm not convinced this is what we want. Because if we were so desperate to unify all of our messages into a single client, we wouldn't have disabled email notifications in all of them.

## Confusing the Problem 
The first time I received a Discord invite, I grumbled. Most of the groups I'm in send messages through Slack. Now, I have another app I need to check for notifications when someone reaches out to me. 

The problem here appears at its surface to be related to messaging clients. It'd be great if my Slack messages could send directly to Discord. It'd be even better if all the messaging apps in the world could agree on a simple protocol to send messages to each other.

Then I realized such a protocol already exists. It's called REST. We already have a standard for accepting and sending messages to other apps that is generic enough to work not just for Slack and Discord but for all apps. In this way, **all apps are messaging apps.**

If I want to tell someone my opinion about the code they wrote, the best place to send that message is on GitHub, contexted next to the relevant line of code. If I have a question about project specifications, the best home for that is a comment on the google document detailing those specifications. The best place to send messages is not to one central service to make it easier to check notifications. It's to the application where the information is most relevant so that it's there the next time you need to use that information.

This idea of context gets to the heart of why we don't have email notifications enabled for every application we use. Email should be sacred, and most productivity folks advise to save it for the most urgent communication. Everything else is of lower priority, only relevant when you want to tackle the context of the message again. 

To bring all instant messaging into a single application client is to say that all of the groups we interface with are of similar or equal priority. This idea is insane. I have a messenger group with friends I live with, and because of that living situation, those notifications need immediate responses. I'm in a Roam slack, but because people are usually only on it during the workweek, I could check those notifications every few hours. I'm in a Discord group for Next.js, but because I'm only interested in the news relevant to my work, I could afford to check those messages every few months or so. To put them all in the same messaging client is to put them all on equal levels of priority.

Not all groups we're in are equally important to us. Different groups also value different tradeoffs that these messaging clients make. To consolidate to one protocol or client is to pick one of these groups' preferences and make it the standard for all groups.

## Confusing The Solution 
When I think about why any of these message aggregation apps haven't taken off, I realize it's because they haven't improved on their main competitors: email and REST. By aggregating all messaging applications, they lose the context for why we use that specific application in the first place.

But it still _feels_ like there's a problem here. Why do I have so many seemingly similar messaging apps for all my different groups?

One approach to solving this problem refers again to context. Application developers could better embrace the idea that all apps are messaging apps by surfacing more endpoints that other applications could hit. They could also prioritize features that allow its users to send messages contexted to the relevant information instead of taking it "offline" into an instant messaging platform. These features could have the long-term effect of placing less pressure on instant messaging. This decreased pressure allows teams to practice asynchronous communication better.

Another approach to solving the problem could still be on the tooling. But, instead of better tools for _aggregating_ communication, we could instead focus on building better tools for _navigating_ communication. Better shortcuts for switching applications, more fine-grained control over notifications on the operating system level, and faster application startup time are all in the spirit of helping navigation. We won't feel the need for everything to be in one place if it was just as easy to navigate multiple.

I bear no ill will towards Beeper or any of these other messaging aggregators. It's possible that I'm dead wrong and that they perform spectacularly. I'm just not convinced message aggregation is what we're looking for; otherwise, one of these apps would have already solved this problem.
