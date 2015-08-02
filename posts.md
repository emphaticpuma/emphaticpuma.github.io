---
layout: default
title: posts
permalink: /posts/
---

<ul>
  {% for post in site.posts %}
    <li>
      <span>{{ post.date | date: '%B %d, %Y' }} ::</span> 
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>