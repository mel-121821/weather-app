# weather-app

## Instructions:

[x] Set up a blank HTML document with the appropriate links to your JavaScript and CSS files.

[x] Write the functions that hit the API. You’re going to want functions that can take a location and return the weather data for that location. For now, just console.log() the information.

[x] Write the functions that process the JSON data you’re getting from the API and return an object with only the data you require for your app.

[x] Set up a form that will let users input their location and will fetch the weather info (still just console.log() it).

[x] Display the information on your webpage!

[x] While you don’t have to, if you wish to display weather icons then there can be a lot of them to import, so have a look at the dynamic import() function. Unlike plain template strings without an import, Webpack can read dynamic imports and still bundle all the relevant assets.

[x] Add any styling you like!

[x] Optional: add a ‘loading’ component that displays from the time the form is submitted until the information comes back from the API. Use DevTools to simulate network speeds.

[] Push to GitHub and share your solution!

---

## Images:

### Icon set 1:

Name: snow.jpg\
Artist: Aaron Burden\
Url: https://unsplash.com/photos/focused-photo-of-a-snow-flake-5AiWn2U10cw

Name: rain.jpg | showers-day.jpg\
Artist: Lum3n\
Url: https://www.pexels.com/photo/macro-shot-photography-of-water-drops-1028600/

Name: fog.jpg\
Artist: Dominik Hofbauer\
Url: https://unsplash.com/photos/white-and-black-boat-on-water-during-sunset-TueNuRlbHYI

Name: wind.jpg\
Artist: Ralph Olazo\
Url: https://unsplash.com/photos/wind-turbines-on-gray-sand-near-body-of-water-during-daytime-TxsU_3V7di4

Name: cloudy.jpg\
Artist: Barry Simon\
Url: https://unsplash.com/photos/selective-focus-photography-of-gray-clouds-4C6Rp23RjnE

Name: partly-cloudy-day.jpg\
Artist: Miguel Á. Padriñán\
Url: https://www.pexels.com/photo/white-clouds-on-blue-sky-19670/

Name: partly-cloudy-night.jpg\
Artist: Joonas kääriäinen:\
URL: https://www.pexels.com/photo/clouds-under-full-moon-239107/

Name: clear-day.jpg\
Artist: Henrique\
URL: https://unsplash.com/photos/multicolored-hot-air-balloon-on-cloudy-sky-lVl3VrfIOgw

Name: clear-night.jpg\
Artist: Kai Pilger\
URL: https://www.pexels.com/photo/cluster-of-stars-1341279/

### Icon set 2:

Name: snow-showers-day.jpg\
Artist: Lan Gao\
https://unsplash.com/photos/a-close-up-of-a-pine-tree-in-the-snow-xn1oO7-t3ws

Name: snow-showers-night.jpg\
Artist: Väinö Parjanen\
URL: https://www.pexels.com/photo/rain-in-flash-of-citylights-15104143/

Name: thunder-rain.jpg | thunder-showers-day.jpg | thunder-showers-night.jpg\
Artist: Basil Smith\
URL: https://unsplash.com/photos/a-tree-in-a-field-with-a-lot-of-lightning-KmsDi5XH__0

Name: showers-night.jpg\
Artist: Topntp26\
URL: https://www.freepik.com/free-photo/rain-drops-window_1273693.htm#fromView=search&page=1&position=1&uuid=72f6f544-6b63-4c09-98de-2e65b3233d1a&query=rainy+night

---

## Tools:

Pull color palette from an image:
https://coolors.co/image-picker

Color filter for SVGs:
https://codepen.io/sosuke/pen/Pjoqqp

Unicode Symbols: (For degrees Celsius/Farenheit)
https://www.compart.com/en/unicode

CSS Loaders Collection - Spinners
https://css-loaders.com/spinner/

---

## Resources:

Assistance with ESLint and Prettier:\
https://dev.to/emmanuelo/guide-to-setting-up-prettier-airbnb-eslint-and-husky-for-your-next-project-17ge

Overwrite a local repo with a github one:\
https://stackoverflow.com/questions/38784282/git-clone-and-overwrite-local-repository

Airbnb not yet compatible with ESLint flat config??:\
https://stackoverflow.com/questions/74925642/how-to-use-eslint-config-airbnb-with-the-new-eslint-config-spec

ESLintrc vs. flat config:\
https://eslint.org/blog/2022/08/new-config-system-part-2/

https://allalmohamedlamine.medium.com/eslint-flat-config-and-new-system-an-ultimate-deep-dive-2023-46aa151cbf2b

Use git diff to view changes before committing:\
https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository#_git_diff_staged

https://git-scm.com/docs/git-diff

Visual Crossing, all icon Names:\
https://www.visualcrossing.com/resources/documentation/weather-api/defining-icon-set-in-the-weather-api/

Visual Crossing, all preciptypes:\
https://www.visualcrossing.com/resources/documentation/weather-data/weather-data-documentation/

Visual Crossing, weather icons\
https://github.com/visualcrossing/WeatherIcons/tree/main

Async methods\
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions

In order to call a static method or property within another static method of the same class, you can use the <this> keyword\
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static

Filter empty values from an array:\
https://stackoverflow.com/questions/19902860/join-strings-with-a-delimiter-only-if-strings-are-not-null-or-empty

Async and await incompatible with forEach?:\
https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop

map() as an alternative to forEach\
https://stackoverflow.com/questions/71457844/i-want-to-print-index-of-all-elements-without-using-foreach-or-filter-or-map

---

## Notes and Takeaways:

Public instance fields are recreated on every instance (use these if each instance has its own unique data)

Static fields only exist on the class, but can be accessed on instances (use these if the data used throughout the class doesn't change).

Getters/setters behave like variables, and will throw an error if you call them like a fn()
Ex. requestHandler.location(inputVal) in index.js

Assigning a string to textContent erases the existing content of the element, including the span. https://stackoverflow.com/questions/75430221/im-not-seeing-span-tags-in-dom-when-adding-them-via-javascript-loop

---

## Bug Fixes:

Bug: when working with `date("DD-MM-YYYY")`, the outputted day is decreased by 1 when the first character in month is a '0'/
Ex. 1: Date submitted: "2025-09-19" becomes "2025-09-18"\
Ex. 2: Date submitted: "2025-04-07" becomes "2025-04-06"\
This does not seem to be an issue with day characters\
Solution: create a fn() to remove char 5 if it is a 0

Bug: loader icon not displaying\
Notes: loader may not be displayed because it is a grid item and group-1 and group-2 were flex-boxes\
Solution: The icon re-appeared when group-1 was changed to grid, the fact that weather-icon is a flexbox does not seem to cause an issue
