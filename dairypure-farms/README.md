# DairyPure Farms

A fast, accessible website and small online store for a family dairy farm. Built with plain HTML, CSS and JavaScript. No frameworks and no build step.

## Student information

| | |
|---|---|
| Subject | WEDE5020 |
| Name | Banele Zikalala |
| Student number | ST10529461 |
| Group | 5 |

## Project overview

DairyPure Farms is a hypothetical family dairy in Magaliesburg, Gauteng, founded in 1985. It sells milk, cheese, yoghurt, butter and cream to households, shops and restaurants. All names, addresses and phone numbers are fictional.

**Target audience:** Gauteng households, small food retailers and restaurants that want fresh, local dairy delivered chilled.

**Mission:** supply fresh, safe and nutritious dairy across Gauteng.
**Vision:** a farm that feeds its community for generations without wearing out the land.

## Website goals and objectives

| Goal | How success is measured (KPI) |
|---|---|
| Sell products online | Number of quote requests per month |
| Make ordering easy | Share of visitors who add an item to the cart |
| Build trust | Contact form messages and farm tour bookings |
| Be found locally | Search ranking for "fresh milk Gauteng" and similar |
| Work on any device | Mobile share of visits with no layout complaints |

## Key features

- **Store:** search, category filter, price sort, stock warnings and a lightbox for product images.
- **Cart:** add, remove, quantity limits based on stock, saved between pages with `localStorage`.
- **Order and enquiry:** validated form that answers instantly with availability, delivery cost and total, sent in the background with `fetch` (AJAX).
- **Contact:** validated form that compiles an email the visitor sends from their own email app.
- **Map:** Leaflet map with three locations and clickable location list.
- **About:** history, mission, vision, team and an accordion of common questions.
- **Accessibility:** skip link, visible focus, labelled form fields, reduced-motion support.

## Sitemap

```
index.html            Home: hero, farm numbers, range, how ordering works
├── products.html     Store: search, filters, cart, image lightbox
│   └── enquiry.html  Order or enquire: quote with cost and availability
├── about.html        History, mission, vision, team, questions
└── contact.html      Details, contact form, map with three locations
```

## Folder structure

```
dairypure-farms/
├── index.html
├── about.html
├── products.html
├── enquiry.html
├── contact.html
├── robots.txt
├── sitemap.xml
├── README.md
├── css/
│   └── style.css     All styles, tokens at the top
├── js/
│   ├── data.js       Product list and categories (edit prices and stock here)
│   ├── main.js       Shared helpers, cart, menu, count-up numbers
│   ├── products.js   Store page
│   ├── forms.js      Validation, enquiry quote, contact email
│   └── map.js        Leaflet map (contact page only)
└── images/           Logo and product illustrations (SVG)
```

## Run it

1. Open `index.html` in a browser, or serve the folder with any static server.
2. To deploy, drag the folder onto [Netlify Drop](https://app.netlify.com/drop) or enable GitHub Pages.
3. After deploying, replace `https://dairypure-farms.netlify.app/` in `sitemap.xml` and `robots.txt` with your real address.

## Customise

- **Products, prices and stock:** `js/data.js`.
- **Colours and spacing:** the `:root` block at the top of `css/style.css`.
- **Contact email:** `MAIL_TO` at the top of `js/forms.js`.
- **Delivery rules:** `FREE_DELIVERY_FROM` and `DELIVERY_FEE` in `js/forms.js`.
- **Form endpoint:** `ENDPOINT` in `js/forms.js` points to JSONPlaceholder, a free test API that accepts a POST and replies. Swap it for a real form service before going live.

## Design

- **Colour:** white and warm cream (`#faf6ec`) for space, dark brown ink `#2a2110` for text, toffee brown `#7a5200` for links and numbers, butter `#f6dc8f` for the main buttons. Muted text is `#6b5d44`, borders are `#e8dfcb` and errors are `#a8321f`.
- **Type:** Sorts Mill Goudy for headings and Google Sans for body text, both from Google Fonts with system fallbacks.
- **Layout:** one clear column on mobile, two columns from 800 px wide. The hero image sits in an arch, the one memorable shape on the site.
- **Breakpoints:** 720 px (mobile menu) and 800 px (multi-column layouts). Sizes use `rem`, `%` and `clamp()`.
- **Images:** original SVG illustrations, so there are no licences to clear and the pages load quickly.

## SEO

- Unique `title` and `meta description` on every page, plus Open Graph tags.
- One `h1` per page with `h2` and `h3` below it.
- Descriptive `alt` text on every image.
- Clean file names and internal links between all pages, with category links such as `products.html?category=milk`.
- `LocalBusiness` structured data on the home page.
- `robots.txt` and `sitemap.xml` included.
- Scripts use `defer`, images are lazy-loaded and the whole site has no framework to download.

## Testing

Test in Chrome, Firefox and Safari, then add screenshots to `screenshots/` and link them below.

| Device | Width | Result |
|---|---|---|
| Desktop | 1440 px | [Desktop](screenshots/desktop.png) |
| Tablet | 768 px | [Tablet](screenshots/tablet.png) |
| Mobile | 390 px | [Mobile](screenshots/mobile.png) |

Checked while building: category filtering, search, cart totals, stock limits, cart saved between pages, empty-form errors, valid enquiry quote and the contact email preview.

## Changelog

| Part | Change |
|---|---|
| Part 1 | Created the five pages `index`, `about`, `products`, `enquiry` and `contact` with a shared header, navigation and footer. |
| Part 1 | Replaced the broken navigation links (`About Us.html`, `Contact Us.html`) with clean, lower-case file names. |
| Part 2 | Moved all styling from each page into one external `css/style.css`, with design tokens and a CSS reset. |
| Part 2 | Added responsive layouts, a mobile menu and relative units. Removed three duplicated copies of the footer styles. |
| Part 3 | Moved all scripts into `js/`. Removed the missing `script.js` reference and the unused Chart.js library and dashboard canvases. |
| Part 3 | Built a working store: product data, search, filter, sort, cart, lightbox. |
| Part 3 | Added the enquiry page with validation, AJAX submission and a cost and availability response. |
| Part 3 | Rebuilt the contact form to compile an email, and added the three-location map. |
| Part 3 | Added accordion questions, animated numbers, SEO tags, structured data, `robots.txt` and `sitemap.xml`. |
| Part 3 | Removed the duplicated footers, the unused social links that pointed to `#` and the browser `alert()` popups. |
| Part 3 | Changed currency to rand, prices to realistic amounts and phone numbers to South African format. |

## References

Add your accessed dates and check each link before submitting. Format follows Harvard (adapted for the IIE).

- Agafonkin, V. (2023) *Leaflet: an open-source JavaScript library for interactive maps*. Available at: https://leafletjs.com (Accessed: 23 November 2026).
- Font Awesome was removed from the project. No icon library is used.
- Google (2024) *Google Fonts: Google Sans and Sorts Mill Goudy*. Available at: https://fonts.google.com (Accessed: 23 November 2026).
- Mozilla (2024) *MDN Web Docs: HTML dialog element, Fetch API and localStorage*. Available at: https://developer.mozilla.org (Accessed: 23 November 2026).
- OpenStreetMap contributors (2024) *OpenStreetMap*. Available at: https://www.openstreetmap.org (Accessed: 23 November 2026).
- Typicode (2024) *JSONPlaceholder: free fake API for testing*. Available at: https://jsonplaceholder.typicode.com (Accessed: 23 November 2026).
- Schema.org (2024) *LocalBusiness*. Available at: https://schema.org/LocalBusiness (Accessed: 23 November 2026).

### Image References

Harvard style. Accessed date is 24 November 2026. Where a pin's original creator could not be identified, Pinterest is used as the author and the year is given as n.d. (no date). Replace these with the creator's name and year if the pin shows them.

#### Reference list

- Pinterest (n.d.a) *Whole milk* [Image]. Available at: https://za.Pinterest.com/pin/1043427807389755565/ (Accessed: 24 November 2026).
- Pinterest (n.d.b) *Plain yogurt* [Image]. Available at: https://za.Pinterest.com/pin/355432595593492648/ (Accessed: 24 November 2026).
- Pinterest (n.d.c) *Berry yogurt* [Image]. Available at: https://za.Pinterest.com/pin/503981014557748293/ (Accessed: 24 November 2026).
- Pinterest (n.d.d) *Hero cow* [Image]. Available at: https://za.Pinterest.com/pin/579768152080389288/ (Accessed: 24 November 2026).
- Pinterest (n.d.e) *Milk and skim milk* [Image]. Available at: https://za.Pinterest.com/pin/839639924291732466/ (Accessed: 24 November 2026).
- Pinterest (n.d.f) *Feta cheese* [Image]. Available at: https://za.Pinterest.com/pin/704602304183726051/ (Accessed: 24 November 2026).
- Pinterest (n.d.g) *Butter* [Image]. Available at: https://za.Pinterest.com/pin/1135259018606396744/ (Accessed: 24 November 2026).
- Pinterest (n.d.h) *Gouda cheese* [Image]. Available at: https://za.Pinterest.com/pin/4597682716612969024/ (Accessed: 24 November 2026).
- Pinterest (n.d.i) *Image* [Image]. Available at: https://za.Pinterest.com/pin/882846333210402987/ (Accessed: 24 November 2026).
- Vecteezy (n.d.) *Outline cow head vector logo* [Vector graphic]. Available at: https://www.vecteezy.com/vector-art/15426730-outline-cow-head-vector-logo (Accessed: 24 November 2026).

### In-text citations

| Image | In-text citation |
|---|---|
| Whole milk | (Pinterest, n.d.a) |
| Plain yogurt | (Pinterest, n.d.b) |
| Berry yogurt | (Pinterest, n.d.c) |
| Hero cow | (Pinterest, n.d.d) |
| Milk and skim milk | (Pinterest, n.d.e) |
| Feta | (Pinterest, n.d.f) |
| Butter | (Pinterest, n.d.g) |
| Gouda cheese | (Pinterest, n.d.h) |
| Unnamed image | (Pinterest, n.d.i) |
| Logo | (Vecteezy, n.d.) |

The product illustrations and all written content are original.
