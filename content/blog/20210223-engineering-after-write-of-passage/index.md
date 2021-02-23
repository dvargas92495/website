---
title: "Engineering After Write of Passage"
date: "2021-02-23T09:28:08.000Z"
description: "Applying what I learned in Write of Passage to how I write software"
acknowledgement: Lyle McKeany, Anushri Kumar, Zachary Fleischmann, Michael Koutsoubis, Compound Writing
tags: David Perell, Consistency, Concise, Audience, Personal Monopoly
---

I [recognized](https://davidvargas.me/blog/hello-world/) in early 2020 that:

- Communicating ideas effectively were as or more important than implementing them
- I was dogshit at communicating ideas effectively

So began my journey of improving my communication through all mediums: writing, speaking, designing. Soon after I came to this realization, I came across David Perell's online writing course, [Write of Passage](https://writeofpassage.school/). Sold by the premise that it would improve my weakness in the first of these three mediums, I joined the July 2020 cohort.

The course was phenomenal. I didn't turn into a good writer overnight, and I don't consider myself a good one yet. But it gave me a framework and habits to practice to become one over the next several years.

While marketed as an online writing course, Write of Passage was more than that. It teaches lessons that apply to several other forms of online content creation. I started to implement them in how I develop software.

Here are my biggest takeaways of Write of Passage and how I'm trying to leverage them in software.

## Information Capture

One of the first things we learned in Write of Passage was the importance of an information capture system. It's the process of consuming content, recording our thoughts as notes, and storing them all in one application. These notes form the "Lego blocks" for building future articles. 

I never took notes on any content I consumed. This habit was a response to school imposing what seemed to be tedious work growing up, never recognizing the value. When it came time to write code, I found myself re-googling ideas I had already read about or listened to. 

Now I take notes on the content I consume. These include courses, blog posts, talks, and conferences. Once I take notes on a given piece of engineering-related content, I ask myself, "could I turn any of these takeaways into a GitHub issue in one of my repos?" The notes become tasks that I implement.

Some examples include:
- Using the React Testing Library in my first couple of npm modules after taking Kent C. Dodd's [Testing JavaScript](https://testingjavascript.com/) course.
- Implementing the new `Image` component after attending Next.js Conf
- Transitioning to DynamoDB after [this talk](https://www.youtube.com/watch?time_continue=64&v=HaEPXoXVf2k&feature=emb_logo) by Rick Houlihan

## Clear and Concise
I spent most of school making my writing as verbose as possible in a desperate attempt to hit word counts. I'm only now trying to unlearn this habit. Write of Passage stressed the importance of compression: expressing ideas clearly and concisely. Each written word carries weight. The course framed editing as chiseling filler words to get to the core ideas.

I view writing software now in the same way. Each line of code carries with it a maintenance cost. My goal is to write methods the same way as Write of Passage teaches to write sentences: communicate a single idea. If the method is trying to do too much, then split into multiple functions, each communicating its job clearly through its signature.

The importance of scoping applies to projects too. When I started to learn how to code, the projects I chose to build were ambitious. After the first couple of months, I would inevitably enter what I call [Refactor Purgatory](https://davidvargas.me/blog/beware-of-refactor-purgatory/). I would eventually abandon them after the projects' sizes would hinder my progress.

Today, I choose projects I could finish within a week or two. My goal is to get a minimally viable product in the users' hands as soon as possible while keeping the use cases simple. These are the same benefits you get from concise writing: sharing work with readers that they understand.

## Be Consistent and Prolific
"The opposite of progress is perfection" is one of my favorite Twitter idioms and rings especially true for creating work online.

Write of Passage stresses that the only way to become a better writer is to write. Consistently. Build it into your daily routines, and over time your writing will dramatically improve. 

But it's not just writing consistently - you need to publish consistently too. When others read your work, you learn much more about your blind spots and resolve them over time. Both of these points apply to coding as well.

I've seen too many engineers hesitate from publishing because their software needs to capture every edge case. But all software is broken. The tools we make will never be perfect, so the key is to get them in front of users as soon as possible to learn which imperfections are the most important to tackle. 

So publish consistently. Invest time into learning tools that make this feedback loop as short as possible. Get the end product into the users' hands as much as possible, just as Write of Passage encourages writers to publish their work to readers.

## Build an Audience With a Newsletter
Write of Passage emphasizes the importance of a Newsletter. It argues it's one of the best ways to cultivate an audience by moving from open platforms (Twitter, Instagram, etc.) to owned platforms. 

With a newsletter, you have a direct line of communication with your audience. Your readers could respond to and share work that you push to that mailing list. This network effect leads to subscriber growth and consequently audience growth.

The work you share with your audience doesn't have to be just writing. It could be new software tools as well. [Tanner Linsley](https://tanstack.com/) is one example of someone who uses his "TanStack" newsletter to inform his audience of the latest news and updates related to his projects.

## Start With What You're Interested In
Write of Passage culminates with discussions on finding your "Personal Monopoly." The idea argues that by combining your unique set of skills, you eventually develop the monopoly that is the intersection of these skills. People then follow you because no one else could compete with your unique intersection.

David Perell's pitch is that writing online will help you discover what your personal monopoly is. It's something that emerges the more we share our work and focus on writing about what interests us. Over time, feedback and iteration will guide us towards refining our personal monopoly.

My pitch is that sharing _anything_ online will do the same thing, which includes open-source software. When I left my job, I started working on projects that interested me. I have not found what my personal monopoly is. But by starting with what interested me, I began to build RoamJS and am inching closer to the type of open source work I want to be doing overall.

While most of the lessons in Write of Passage targeted aspiring writers, they could be applied more broadly. They could help anyone looking to create content online. The course will help you start thinking about your online presence, how you build an audience, and the habits you need to develop to iterate towards your personal monopoly.
