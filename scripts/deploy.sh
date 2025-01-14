#!/bin/bash

# Deploy to Railway
railway up --service api

# Deploy to Vercel
vercel --prod

# Verify Cloudflare settings
cloudflared tunnel verify 