---
layout: post
comments: true
ads: true
title:  "Working with Postman Pre-request Scripts"
date:   2017-11-27 12:10:00 -0500
categories: javascript api postman
---

For the past few weeks I've been working on the second version of the core API we have at [Wellthie](http://www.wellthie.com). To make sure we've been covering what's needed, we often check the progress with the product team, who is in charge of defining product features. This is a back and forth process, where it would be great if the product team plays around with the new APIs and sees the data the server puts together, which would increase the feedback quality enabling us to deliver faster improvements.

The idea behind this post is to share the way Postman allowed us to have a shared set of API calls, how the Postman's Pre-request scripts feature solved the problem of having to manually copy and paste authentication headers in each API call and to point out some gotchas about the scripts you can write with Postman.


## Why Postman?

Considering the amount of tools for interacting with APIs existing today, I believe there is no perfect tool that will meet all of your needs. This is why, at some point, you may need to start looking for options and make a choice based on what you need to cover.

After a few seconds of searching in the web I found following tools:

* [soapUI](https://www.soapui.org/)
* [Paw](https://paw.cloud/)
* [Postman](https://www.getpostman.com/)

I knew about [soapUI](https://www.soapui.org/) and [Paw](https://paw.cloud/), but in this particular case, I wanted to have a tool intended to be used by non-technical people. Someone who could make an API call without having to know what's going on underneath. That said, I thought *soapUI* was a little too much. I think it is perfect for a QA expert but not for someone who just wants to see response data.

After reviewing *Paw* I thought it was cool and useful, but would not be the best choice in case you don't want to increase your expenses.

You may think that companies pay to use Postman, but its free version is good enough for small teams.

Postman allowed me to create a set of initial API call samples in a very short amount of time, plus it allows to set environment variables so that we don't need to duplicate calls for each environment. It's got a nice import/export feature and its user experience adjusts perfectly to what we needed.

After creating all the API call samples and having the environments configuration set up, I had pretty much everything I needed to share... but I was missing something.


## Postman Pre-request Scripts

After getting everything ready, I remembered each API required authentication headers. This is a problem because I needed to manually copy and paste these headers from the *sign_in* API call response, to the new API request I wanted to make, and there was no way I would put a non-technical person through this painful process. Additionally, the authentication data expires in a very short amount of time, which means this was something that needs to be done quite often.

I spent quite some time trying to figure out a way to make this work. I tried to make the *sign_in* call before making any other calls and then, somehow, reference those headers and use them in the other calls. After doing a bit of research I realized there was a feature called *Pre-requrest Scripts*. This feature allowed me to create a script before making an actual call.

That was it, I found the solution to the problem I had. Now, to the script:

```javascript
pm.sendRequest({
    url: "<host>/api/sign_in",
    method: 'POST',
    header: 'Content-Type:application/json',
    body: {
        mode: 'raw',
        raw: JSON.stringify({
            "email": pm.environment.get("user_email"),
            "password": pm.environment.get("user_password")
          })
        }
}, function (err, response) {
    if (response) {
      pm.environment.set("access_token_header", response.headers.get('access-token'));
      pm.environment.set("client_header", response.headers.get('client'));
      pm.environment.set("expiry_header", response.headers.get('expiry'));
      pm.environment.set("uid_header", response.headers.get('uid'));
    }
});
```

Postman exposes a variable called `pm` which implements a `sendRequest` function. It can take just a URL as an argument or an object, very similar to jQuery. It also exposed the environment variable through the `pm.environment` property. This way I could make the call to the *sign_in* API and then save the header values in the environment variables, which I make reference to in the actual API call sample. The script also takes the `email` and `password` values previously set, and uses them as parameters on the *sign_in* API call.

This is how the headers' tab looked like in one of the Postman samples:

![]({{"/assets/images/working_with_postman-example.png" | absolute_url}} "Postman Example")


This way I was able to automate the sign in process before calling every *secured* endpoint.


### Gotchas

It would be weird if there weren't any gotchas, would it not? Well, I tripped on an issue which stalled me for a while.

If you go ahead and print out the headers to the Postman console
```javascript
console.log(response.headers);
```

You may get something like this:
```javascript
Array:[]
```

This may lead you to think the `response.headers` is an array, but the truth is the `response.headers` object isn't an array, it is an instance of the class [`HeaderList`](http://www.postmanlabs.com/postman-collection/HeaderList.html), which is implemented in the [Postman SDK](http://www.postmanlabs.com/postman-collection/index.html).

This class offers many methods including `get(key)` which is the one I used in the script to get the actual values of the headers, one header at a time. Before realizing this method existed, I spent quite some time trying to access the headers content like if it was an actual array. This sounds a bit silly and it could get very annoying if you don't realize what's going on. It's a bit obvious but it is always a good idea to check the docs of the tool you're using, especially if the tool offers programmatic features.


## Final Thoughts

Postman could be as simple as you want it to be. It provides enough features for you to get going with your API testing and to share these sample calls with other team members, even if they aren't technical.

Again, I believe there is no perfect tool. I think you could be better off knowing a little bit about multiple tools than knowing one single tool in deep and forcing yourself to use it everytime just because that's what you're used to. Give yourself a chance to discover new things.

We often forget about non-technical people and the truth is, they play a very important role in getting a high-quality product built. The closer you work with them the more you understand the product and its impact.
