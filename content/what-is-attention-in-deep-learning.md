---
title: Lets pay some Attention!
date: 2024-06-14T15:00:00.000Z
url: what-is-attention-in-deep-learning
edit: https://github.com/a6kme/a6kme/edit/master/content/what-is-attention-in-deep-learning.md
abstract: In this article, I will attempt at explaining the concept of Attention in Deep Learning. I will try to explain the intuition behind it and throw some light on different applications in NLP and Vision models.
hero:
  img:
  alt:
  credit:
---
### What is Attention?
Lets stare at this image for a while.

<div style="text-align:center;">
  <img src="/articles/attention/cltrd.png" style="width: 100%;">
  <i style="font-size:0.75em;">Source: https://pngtree.com/</i>
</div>

Did you find your eyes moving like a scanner? What are the things that you noticed first? Lets take a look at the below sentence. 

<p style="text-align:center;"><i>Holy Moly! I can't believe I saw a cat riding a unicorn in the sky!</i></p>

What are the words that you noticed first? 

Our brain is a complex machine which is capable of processing a lot of information at the same time. But, it is also capable of focusing on a particular part of the information and extracting relevant information from it. In both of the cases, our brain is trying to focus on different parts of the image or text to understand it better and extract relevant information from them. This can also depend on the "context" or how your day is going. Somedays, you may notice one thing more than other thing. This is essentially the mechanism of attention in deep learning.

### History
Attention was first introduced by Bahdanau et. al. in 2014 in the context of Neural Machine Translation. It was later adopted in Vision by Xu et. al. in 2016. The real breakthrough came in 2017 when Vaswani et. al. introduced the Transformer architecture which used the concept of Attention and helped parallelize it to leverage the parallel compute of the GPUs. Since then, the concept of Attention has been widely adopted in various NLP and Vision models.

Lets take a closer look at these milestones to understand their evolution.

**Neural Machine Translation**: In the context of Neural Machine Translation, the task is to translate a sentence from one language to another. But the ordering of the words can be different in different languages. For example, consider the English sentence - "The agreement on the <span style="color:red;">european</span> <span style="color:green;">economic</span> <span style="color:orange;">area</span> was signed in August 1992". Its French translation is "L'accord sur la <span style="color:orange;">zone</span> <span style="color:green;">économique</span> <span style="color:red;">européen</span> a été signé en août 1992".

In this case, the word "european economic area" is translated to "zone économique européen", which is essentially reversed. Attention visualisation helps us understand how the model is focusing on different parts of the sentence to translate it. In the below image, we can see how the the model is focusing on Area for Zone, Economic for économique and European for européen.

<div style="text-align:center;">
  <img src="/articles/attention/translation_attention.png" style="width: 100%;">
  <i style="font-size:0.75em;">Source: Neural Machine Translation Paper by Bahdanau et al., 2014</i>
</div>

**Image Captioning**: In the context of Image Captioning, the task is to understand the context of objects in the image and extract relevant information from it. In the below image, we can see how the model is focusing on different parts of the image to understand it better.

<div style="text-align:center;">
  <img src="/articles/attention/vision_attention.png" style="width: 100%;">
  <i style="font-size:0.75em;">Source: Show, Attend and Tell by Xu et al., 2016</i>
</div>

We can see that the vision model is able to focus on different parts of the image when generating the underlined word in the caption. These Attention Masks are used for visualisation purposes and help us understand how the model is focusing on different parts of the image, when generating an output word in the caption.

**Transformer**: Transformer architecture used similar mechanism of Attention Scores and helped it parallelize to leverage the parallel compute of the GPUs. This enabled us to train larger models and scale them to larger datasets and helped in achieving state of the art results in various NLP tasks and Vision. The mechanism allows for richer representation of the data and also allows us to train it efficiently across parallel compute. We can see that in the below image, how the model is focusing on different parts of the sentence.

<div style="text-align:center;">
  <img src="/articles/attention/illustrated_transformer.png" style="width: 70%;">
  <i style="font-size:0.75em;">Source:jalammar.github.io/illustrated-transformer/</i>
</div>

We can see how the word `it_` is focusing on `The_ animal_` and `tired_`. 

### Conclusion
In this article, we tried to understand the concept of Attention in Deep Learning. We saw how the concept of Attention has evolved over the years and how it has been widely adopted in various NLP and Vision models. We saw how the concept of Attention helps us focus on different parts of the data and extract relevant information from it. We also saw how the concept of Attention has helped us achieve state of the art results in various NLP and Vision tasks.





