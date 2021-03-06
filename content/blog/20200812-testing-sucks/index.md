---
title: Testing Sucks
date: "2020-08-12T08:25:00.00Z"
description: "When the solution for software quality causes more problems than it solves."
tags: Engineering, Testing, Debugging, Mark43, Continuous Delivery
---

There's a creeping moment of dread that seeps into me every weekday morning. I open my work-issued Macbook and see that red dot on the corner of Slack mocking me. Knowing what's on the other side, I avoid it. Try to keep myself busy with email or jumping into whatever Jira ticket I was working on yesterday. But eventually I have to open it. And I know what's coming. Sure enough, I open Slack and there it is, greeting me with it's gross robotic smile as it does every morning.

Another nightly build failure on master.

As the person put in charge of the developer experience, managing Continuous Integration was my responsibility. We've been having problems for months with tests flaking, which slow down the developer's life cycle and delay new features from reaching our users. We had also seen numerous bugs slip into production. So the theory was building out and stabilizing our testing infrastructure will result in higher quality code delivered to our users faster.

Everything I read online seemed to confirm this theory. I began following prominent figures in the software testing community such as [Kent C. Dodds](https://twitter.com/kentcdodds) and [Angie Jones](https://twitter.com/techgirl1908). I attended conferences run by the [Ministry of Testing](https://www.ministryoftesting.com/). I read article after article about how testing will one day save you time. That it eliminates the manual checking of features over and over again to ensure no additional change broke some other existing functionality. Despite all of these best efforts, I kept seeing months of iterating on these large testing pipelines not translate into higher quality software being delivered to our users. All leading to the conclusion that will probably prevent me from getting hired by another software company ever again:

Testing sucks.

I write this not to necessarily say that you should or shouldn't test. It's a standard in the industry because it has brought us to some level of software quality across development teams. However, just because it's the best solution we have right now, does not mean it's the best solution that will stand the test of time.

# The Cost of Testing

Let's say you are building a widget with a button that saves some form input value. Checking this widget works manually is pretty trivial - you open a web page, type in the value, click save, refresh and check that we have the same form value. Now if you had 50 widgets, the thought of manually verifying each one with a similar manual workflow like this is terrifyingly monotonous. This is the value proposition of tests. To ensure that every time you update your application, all of the existing 50 widgets are still functioning as expected by spending a fraction of the time you would be by inspecting those widgets manually.

The key word here is fraction. It means that tests still have an associated cost. Because this marginal cost is much lower in comparison to manual inspection, we feel compelled to spend it at a much higher frequency. Teams begin to run the tests for these widgets on every commit before it gets merged to master. That cost compounds quickly and unnecessarily, as you have tests that run in response to completely unrelated changes. When flakes start happening, developers waste time diagnosing false negatives. Messages fly in Slack as people try to understand what the test does and how it could have broken. We end up **investing more time in the quality of our tests** than in the quality of our implementation, which was the whole reason why we decided to take up testing in the first place.

Because this associated cost is so pervasive, there is a wide range of opinions in the testing space of what makes the most effective tests. People use all sorts of terms to describe the various tests their teams implement: regression, integration, system, etc. In practice, these terms all fall on a one dimensional spectrum, and our definition of these terms are based on our arbitrary divisions of this spectrum. On one end we have **Unit** and on the other we have **End-to-End**. They both come with their own flaws.

# Downsides of Unit Tests

Unit tests are meant to ensure that the smallest unit of functionality is working as expected. It's aligned with the modular philosophy of software design, which is to build small composable components, test them in isolation, and then have confidence that your entire system will be working as expected when you put them all together. The problem with this philosophy is best encapsulated by this umbrella:

https://twitter.com/erinfranmc/status/1148986961207730176

It's pretty trivial to ensure that the handle or the ferrule of the umbrella are working in isolation. This is mostly because the simplest part of system design are the mini components that we build in isolation. The majority of complexity stems from the _interconnection_ between all of these components and whether or not they are calling each other with the appropriate parameters or configuration. Because you usually have to mock out all of the dependencies your component depends on, you often avoid testing the properties most responsible for bugs in production.

A good unit test should treat our component like a black box, ensuring that for a given input we receive an expected output. In the ideal world, this looks something like this:

```javascript
const fibonacci = (i: number) => fibonacci(i - 1) + fibonacci(i - 2);

test("fibonacci works", () => {
  const expectedValue = 8;
  const actualValue = fibonacci(6);
  expect(actualValue).toBe(expectedValue);
});
```

Naturally, in the Test-Driven Development way we start asking questions like "What happens when `i` is 0? A negative number? A string?" We then start building conditionals to handle each of these use cases until somebody finds a third party library that relieves the need from ever having to maintain a function this small in scope again.

Then we get into writing unit tests for the functions that use these wonderful libraries. In trying to write these unit tests, the test starts becoming a snapshot copy of the function implementation. Given the wide selection of third party libraries, particularly in the `npm` ecosystem, I very often have a function that looks like this:

```javascript
const foo = (x: number) => {
  const bar = libraryBar(x);
  const baz = libraryBaz(bar);
  const fizz = libraryFizz(baz);
  return fizz;
};
```

The unit test for something like the above would look something like this:

```javascript
test("foo works", () => {
  mockLibraryBar.mockReturnValue(bar);
  mockLibraryBaz.mockReturnValue(baz);
  mockLibraryFizz.mockReturnValue(expectedValue);

  const actual = foo(input);
  expect(actual).toBe(expectedValue);
});
```

This test ends up being absurdly brittle to change. What if I want to use a separate library under the hood of foo? How do I know I'm using the current libraries I chose correctly if I'm just mocking the same assumptions I'm making in implementation? Am I really gaining any confidence beyond making sure no one changes my implementation?

That last question is really the one that bothers me the most about unit tests. Taken to its logical extreme, they end up being just a second [snapshot](https://jestjs.io/docs/en/snapshot-testing) of your code base, providing the check that no one changes implementation. As a consequence, when someone does change it in an effort to get failing tests out of their way people just mindlessly update the tests to match their new implementation. Bugs that slip in our implementation are reproduced in our tests. Unit tests resembling nothing more than snapshots is a worse solution for the problem that version control solves.

# Downsides of End-to-End Tests

On the other side of the spectrum we have end to end tests. At first exposure, I found end to end tests to be really promising, particularly with the emergence of killer tools like [Cypress](https://www.cypress.io/) and [Applitools](https://applitools.com/). The idea is simple: automate testing of the app exactly like a user would use it. From testing at this high level of button presses and page clicks, you could theoretically gain confidence from changing the internals however you want and ensure the expected behavior is still working.

The downside here is the massive cost to incur upon running any given test. Let's say you want to test a form. But the form is only available for logged in users, so okay let's add some steps to log in the user to the site. Oh but wait we are testing with a clean database snapshot so we have no pre-existing users. So we either need to pre-bake some users or create them on the fly during the test. Damn, now tests are failing because configurations we set up in one test are now affecting the second one, so I guess we need to do a better job of refreshing our database between tests. We run into the fundamental problem of end-to-end testing which is that our tests are no longer _functional_, they depend on some pre-existing _state_.

This leads to extremely costly implications. Configuration that was set up under one test causes future tests to fail. Tests run for an absurdly long time because of all the redundant setup we need just to get an app to a certain state to test the widget of interest. Parallelization becomes an impossible task because of the rigidity of each of these tests and the conflicts of the state access they each have.

What ends up happening is you end up creating a full team of people simply maintaining the stability of these tests. Full-time engineers are spending their sprints constantly addressing all of the false negatives. All while the rest of the engineering team is adding new features to the product and running at a pace faster than the pace of test stability. Software quality then becomes no better than it was before embarking on this automated test journey - just slower delivery.

The heart of what makes testing suck as a solution for software quality is that axiomatically, replicating user behavior is impossible. On some level, regardless of whether you are on the unit or end to end testing extremes of the spectrum, you are taking shortcuts from the live environment to ensure that the highest value features you care about work in the controlled environment. However, those blind spots that emerge from these shortcuts are what could lead to the most pervasive bugs reaching production. A value that is misconfigured, load that you weren't expecting, data shapes that were not anticipated could all lead to outcomes that range from a system wide outage to a primary workflow being hampered. We cannot anticipate all the ways our users will use our system. There are other strategies that help encourage higher quality software that could one day allow us to move on from testing.

# Addressing Quality at the Source

While testing takes the approach of responding to human error, there are strategies that have been developed to prevent human error in the first place. Oftentimes, upgrading the technology we use could wipe out a whole suite of tests that you have implemented because of the guarantees the library provides you.

After years of suffering from null pointer exceptions and associated unexpected type bugs, the JavaScript community is starting to embrace TypeScript as the new standard. Strong typing in general forces engineers to be more explicit about what their software can and can't handle, eliminating a whole class of bugs that result in confusing error messages and application crashes. Similarly, linting has allowed teams of developers to agree upon a set of rules that everyone should follow that will improve the experience of reading each other's code.

Another example I've seen is the use of [ORMs](https://en.wikipedia.org/wiki/Object-relational_mapping). In my last job, we had a whole class of tests dedicated to ensuring our data access layer matched the data shape of our MySQL schema. With an ORM, particularly one like [jOOQ](https://www.jooq.org/), you could simply code generate the data access layer _based on your database schema_. This deprecates the need to write and maintain these data access layer tests, which were often the result of developers monotonously copy and pasting similar tests.

Outside of preventing human error at the source, bugs are often a result of implementing the _wrong_ feature. Collecting data surrounding the usage of our application while it's live in production continues to get easier. Tools like google analytics can give you insight into the traffic on your site, while services like Stripe give you dashboards that summarize how much revenue your business is generating every month. At the end of the day, the quality of our software is not really tied to whether or not a button is working or throwing exceptions, it's tied to real world consequences that could be captured by these real world metrics.

If there's a widget on our site that's not performing as expected, but users are still able to adapt and perform the same workflows, does it really matter? Should that bug be preventing all other app improvements from being merged to master because our rigid test says so? Monitoring our application behavior gives us the insights on the metrics that we actually care about optimizing, more than our code coverage percentage.

One of my favorite quotes about testing is Kent C. Dodd's "Easy to test code is easy to use code". I spent months trying to resonate with this idea in theory. The problem was that iterating towards easy to use code required multiple revolutions of trial and error that often gets slowed down by duplicating this work in our tests. User specs change often, which means expected behavior often changes, which means our tests as a method of documenting expected behavior changes often. We need new metrics of success that inform us in an automated fashion that we are outputting high quality work.

Because testing sucks, I'd like to reshape our approach towards software quality by focusing directly on producing "easy to use code".
