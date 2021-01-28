# Bottle Rocket Challenge
Notes
- Used my custom [redux boilerplate](https://github.com/rgualberto/redux-bp) as a starting point
- I wasn't sure what the map icon in the header was supposed to do so I made it open up a slightly larger map with all of the restaurant pins.
- Final bundle built w/ webpack - see config for specifics
- The comps specified an image height for the restaurant card backgrounds but I thought it would be better to allow it to expand to its full width (and therefore variable height) to take advantage of the extra space created at higher viewports.
- The asset provided for the back button (when modals are open) does not match that of the comp (it is a bit thinner/hard to see at a glance). Normally I'd bring in an svg chevron but I decided to stick to what was provided.
- PWA basics included but not fully optimized.
  - missing proper assets for loading splash screen & icons
  - service workers precaching bundle but not assets/external requests
  - not served over https


## Installation && Usage

```shell
// install packages
$ npm install

// Run local dev server (http://localhost:8080):
$ npm run dev
```
