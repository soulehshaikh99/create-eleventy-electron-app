---
layout: base.njk
title: Eleventy Electron App
logoBanner:
  src: /assets/eleventy.svg
  alt: Electron Gatsby Crossover Banner
navigationItems:
  Docs: https://www.11ty.dev/docs/
  Contribute: https://www.11ty.dev/docs/how-to-support/
  Search: https://www.11ty.dev/docs/search/
  GitHub: https://github.com/11ty/eleventy/
  Twitter: https://twitter.com/eleven_ty
  Discord: https://discord.com/invite/GBkBy9u
---

# WELCOME TO ELECTRON-ELEVENTY APP!

<img alt="{{logoBanner.alt}}" src="{{logoBanner.src}}" />

Visit the <a target="_blank" href="https://www.11ty.dev/docs/tutorials/">docs</a> to learn how to build static sites using Eleventy.

<nav>
<ul>
{%- for item in navigationItems %}
<li><a href="{{item[1]}}">{{item[0]}}</a></li>
{% endfor -%}
</ul>
</nav>