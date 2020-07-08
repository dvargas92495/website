---
title: Why Did My Build Fail?
date: "2020-07-08T16:09:00.00Z"
description: "Turning the most frequently asked question I get at work into an explanation of how I diagnose problems more generally."
---

"Hey Vargas, I saw this failure come up, any idea what it means?"

I'm currently working on an internal tools team. It's my job to help other engineers do their jobs as comfortably and void of road blocks as possible. The term 'build' is usually a reference to an automatic process that runs whenever an engineer wants to make a change to the app we're working on. However, the types of issues I help others out with could involve any tool they use, and I will use the term 'build' to encapsulate them all. When other engineers encounter errors that are mysteriously vague, I'm frequently the person they turn to, hoping that I have the magic wand that will clear the boulder from their path.

This uptick in slack messages in pursuit of being unblocked has resulted in two consequences emerging. The first is a gained familiarity with most of my company's systems by having to debug issues with people spanning multiple teams and areas of expertise. The second, more impactful consequence is developing debugging strategies that now transcend whatever system I am diagnosing.

These strategies were developed by noticing consistent patterns of how I helped other engineers and observing which approaches were successful. They allow me to dive head first into not only any red error message that comes up on my screen, but to any "bug" that comes up in my everyday life. This includes problems that are not only technical, but behavioral as well. Here are the strategies I use and am still refining when I come across an unexpected failure.

## Search Keywords Everywhere

This is the common approach we all do. We copy and paste an error message into google and hope that Stack Overflow will load as the first or second link to save the day. However, most people stop there, when there are several other treasure troves of information that could be hiding the answer. 
- Comb through internal messaging services 
- Search internal documentation 
- Go directly to the service's forum or documentation

The key question I ask here is "who else could have possibly run into this error, and where would they save the answer?" When the answer is somebody else on my team, I'll often comb through messages even if I don't remember the topic being specifically discussed. When the answer is somebody outside the company, I'll dig through the service's own documentation. One of the most prominent examples I encounter here is [Cypress.io](https://docs.cypress.io/guides/overview/why-cypress.html), which has excellent documentation and not many on my team use it for our day to day.

The other common mistake made with this approach is overloading our search with too much information. When encountering an error message, pick out the few words most unique to the error message. This opens the search space to all forum answers and documentation that could be referring to the issue you're seeing, but didn't quote the error message directly.

## Source Code

Open source has given us direct visibility into the inner workings of many of our favorite tools. When no immediate answer comes up from searching forums and documentation, I love to get my hands dirty by digging through the source code.

The first step is similar to the previous strategy: search the repository for mentions of the error message. Then try to trace back the logic. The key question I ask here is "how can we possibly get into this state?" Even if I don't find the answer to why my current error occurred, I usually walk away with a deeper understanding of the tool I'm using. If you're lucky, you could even find an issue with the tool itself! Following up on this discovery with a fix could make it so that no one else runs into the issue again and the tool is even more resilient.

## Compare with Successes

The first two strategies are particularly useful for "expected errors" - errors that either users have run into before or engineers anticipate happening. But there are unexpected errors too. The more unexpected the failure we encounter is, the more vague the error message will be, and the harder it will be to find the true source of the error. This is when I try the next strategy: compare the build with the failure with other builds that succeeded. The key question I ask here is "what are all the variables that are different between this build and the successful one?" What configurations are different? Input parameters? Time of day? We also want to find a comparison that is as close to our failure as possible, by minimizing the number of differences between the two builds.
Keep track of literally any difference between the two. Note them even if the difference appears to be in no way related to the error. My initial perception of what could lead to an error is often incorrect and only highlighted after truly seeing the difference of what went right and wrong. When manipulating the different variables start to make builds successful again, they will start to clue you into the true source of what went wrong.

## Time block your debugging

As much opportunity there is to learn new systems, there comes a point where we have exhausted all options tackling an issue. The key question I ask here is "how much time should I spend debugging this issue before asking for help?" It's very easy to get caught in an endless chain of rabbit holes before looking up and realizing that the same error has been plaguing you for days. At a certain point, you've exhausted your own energy to learn about the issue and your time will be more valuable moving on to the next problem to be solved. This is especially true if someone else on your team is more familiar with the domain. I usually will give myself an hour before conceding defeat on an issue and bringing in outside help. It's important to give yourself ample time to tackle the issue directly because it allows you to learn far more about the domain you're familiarizing yourself with.

## Probe the help

This one strategy has had the biggest impact on my ability to debug problems. After my time block has surpassed and I am asking for someone else's help, I am never satisfied with just the answer I receive. The key question I ask here is "how did the person helping me know that this was the solution to my problem?" After someone helps you with your road block, ask them directly. How did you know this would solve my problem? This usually points me to documentation I was unfamiliar with, domain specific debugging tools that I could then reuse in the future, or to new resources that help me learn more about the service I'm using. This has a multiplier effect by expanding the breath of systems that you'll be familiar with and feel comfortable debugging on your own.

This advice also works both ways. Whenever I am asked for help, I try to answer both the question and how I knew the answer to the question. I do this even if the person seeking my help didn’t ask for the source. Which logs did I read? What's the link to the forum? What did I search for? That way, the person I helped will be better equipped to tackle issues on their own, and I'll have more time debugging my own issues! 😅

## Conclusion - Be Curious

There's a natural resistance that occurs when something we are unfamiliar with breaks. We tend to think that because an error looks to be unrelated to what we are working on, it's not our problem and we have nothing to gain from diagnosing it. From my experience, the converse has been true. By remaining curious to strange and unrelated failures that randomly appear, I have been able to learn far more about all the tools we use. I have increased my capacity to help others.

Each of the strategies I outlined above have a common theme underlying them: curiosity. Be curious enough to search in unusual places. Curious enough to probe how your tool works. Curious enough to ask the support helping you how you could have figured this out on your own.

While most of these strategies were developed within the domain of software engineering, using curiosity they can apply more generally. When you encounter your next problem to debug, optimize for curiosity!
