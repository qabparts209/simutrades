#!/bin/bash

# Install dependencies
npm install \
  i18next@^23.7.16 \
  react-i18next@^14.0.0 \
  i18next-browser-languagedetector@^7.2.0 \
  framer-motion@^10.18.0 \
  socket.io-client@^4.7.2 \
  axios@^1.6.2 \
  lightweight-charts@^4.1.1

# Install dev dependencies
npm install -D \
  @types/i18next@^13.0.0 \
  @types/react-i18next@^8.1.0 \
  @types/socket.io-client@^3.0.0 \
  @types/axios@^0.14.0 