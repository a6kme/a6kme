---
title: Dawn of a new age of Computer Programming
date: 2023-03-26T15:00:00.000Z
url: dawn-of-a-new-age-of-computer-programming
edit: https://github.com/a6kme/a6kme/edit/master/content/dawn-of-a-new-age-of-computer-programming.md
abstract: With the advant of Generative Pre-trained Transformer (GPT) and Large Langauge Model (LLM), we have a powerful tool at our disposal as Software Engineers. I am taking a use case of Downloading password protected attachments from Gmail and demostrating how we can leverage this tool and save time and become productive.
hero:
 img: /articles/hero/dawn.png
 alt: New age of Computer Programming
 credit: Generated using OpenAI DALL.E2
---

With the advant of Generative Pre-trained Transformer (GPT) and Large Langauge Model (LLM), we have a powerful tool at our disposal as Software Engineers. In this article, I will try and demonstrate how we can improve our workflows to increase our productivity by using GPT.

### Use case for Demo
I would like to download invoices for my broadband connection from Gmail for the Financial Year (March 2022 - March 2023) and store it in a folder for my records. The invoices are password protected, hence I would like to remove passwords from those invoices before storing it in the destination folder.

<img src="/articles/new-age/gmail.png">

Lets take a moment to think about how you would approach this use case. I believe I had below approaches as options

### Approach 1
1. Search for relevant emails by applying Gmail Filter in Gmail
2. Open every email one by one and download the attachment
3. Open the attachment by providing the password in your favourite PDF reader on your computer
4. Use the PDF reader application to remove the password from your PDF and save it in the destination folder by renaming it

At some point while doing this, my pride as a software engineer would start hurting 😀. So, lets look at Approach 2

### Approach 2
1. Google if someone has published an open source project or code snippet that uses Gmail APIs to filter emails and download the attachments from those emails
2. If you get lucky and find a maintained and modular codebase, try to tweak it as per your need

However, if approach 2 fails, you will have to fall back to Approach 3 [ I am not considering funny ideas like outsourcing this to some junior developer in your team or a freelancer 😉 ]

### Approach 3
1. Search for "Gmail APIs" in Google and go to https://developers.google.com/gmail/api/guides
2. Dig into documentation on how to connect to Gmail programatically
3. Try writing some code while figuring out which scopes to ask while Authenticating your application
4. Filter the emails using [messages.list API](https://developers.google.com/gmail/api/reference/rest/v1/users.messages/list) while trying to understand the structure of the response object received via API call
5. Download the Attachments by calling the [attachments API](https://developers.google.com/gmail/api/reference/rest/v1/users.messages.attachments/get). ( While doing that, you may start [yak shaving](http://www.catb.org/~esr/jargon/html/Y/yak-shaving.html) and start to curse yourself you don't understand what are [Mime Types](https://en.wikipedia.org/wiki/Media_type) yet as a senior software programmer)
6. Google which PDF Library to use to decrypt the encrypted PDF files

... So on and So forth. You get the idea.

Lets look at how we will be approaching such use cases in future

### Approach 4 (The New Age)
1. Open GPT-4 and start asing it what do you need in a declarative way. (The approach 3 that I mentioned above is something what we call an "Imperative way", where we do things step by step.) I used below prompt to get what I want. We can improve the results by providing better prompt by "Prompt Engineering". (Prompt Engineering is a discipline in AI which helps generate better prompts so that GPTs can give better results.)

```text
I have some emails in my gmail inbox which I can query
by using the filter "from:ebill@airtel.com after:03-01-2022 has:attachment".
I would like to download attachments from those emails 
in a destination folder and remove password from the pdf attachments.
```

The experience is something that I have captured in the below video. You can find the generated code [here in the gist file](https://gist.github.com/a6kme/0786dc4e2445303e206b44f42aac36fa).

<iframe width="100%" height="400" src="https://www.youtube.com/embed/b94w28yNfiQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I followed the instructions and generated `credentials.json` from Google Developer portal. I also removed `pyocr` from generated code since it was not used anywhere. (If you prompt this fact to GPT-4, it apologises and removes it from the dependencies and codebase. A pretty sweet AI.)

<img src="/articles/new-age/pyocr_not_being_used.png">

After bit of tweaking around, and asking GPT-4 for help, I was able to get this running smoothly and was able to download all the decrypted attachments in a directory.

<img src="/articles/new-age/attachments.png">

Here is the gist of [final code](https://gist.github.com/a6kme/1631aca545c229e59c62ac85d48caee4). This is pretty much generated by GPT-4 with minimum tweaks done by me.

### Take Aways
1. I was able to achieve my goal without a need for going through exhaustive documentation of Gmail and PyPDF
2. Even with very basic prompt, GPT-4 gave me a very good starting point which I could tweak. If I faced issue, I just asked GPT-4 for help
<img src="/articles/new-age/error_1.png">
<img src="/articles/new-age/error_2.png">
3. GPT has very good context of the problem and it felt like I am seeking help from a Subject Matter Expert on Gmail and PyPDF
4. I felt super empowered while working with GPT and it augments my skills as a Senior Engineer and makes me more productive

So there you go. GPT as a tool can be a proficient Co-Pilot in wide areas of Software Engineering. Hope you have fun with it.