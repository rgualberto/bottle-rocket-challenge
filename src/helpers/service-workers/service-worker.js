import { cleanupOutdatedCaches,  precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

registerRoute(
  ({request}) => request.destination === 'assets/images',
  new CacheFirst({cacheName: 'images'}),
);
