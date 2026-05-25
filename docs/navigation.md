# Navigation Source

Use this file as the source of truth when updating the site header. This is a static GitHub Pages site, so the navigation markup is copied into each root-level HTML page instead of rendered from a build step.

## Desktop Menu

- About Us
  - Our Story
  - Our Strategy
  - Our Leadership
  - Our Partners
  - Contact
- Get Support
  - Victim Support Program
  - Resources
- Get Involved
  - Youth Program
  - Volunteer
- Events
  - Meetings & Gatherings
  - Annual Resource Fair
- Donate

## Mobile Menu

- About Us
- Contact
- Get Support
- Get Involved
- Events
- Donate

## Maintenance

After changing navigation labels or links, update every root-level HTML page header and run:

```sh
python3 scripts/check-navigation.py
```

The checker catches retired header items that previously caused drift, including `Community`, the separate desktop `Contact` button, `Gallery`, and `L.A.U.R.A Youth` under Get Support.
