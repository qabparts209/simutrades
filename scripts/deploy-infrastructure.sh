#!/bin/bash

# Deploy Railway configurations
railway link
railway up

# Apply Cloudflare configurations
for config in infrastructure/cloudflare/*.yaml; do
  cloudflared tunnel route dns "$(basename "$config" .yaml)" "$config"
done

# Deploy Vercel configurations
vercel deploy --prod

# Verify configurations
echo "Verifying configurations..."

# Check Railway
railway status

# Check Cloudflare
cloudflared tunnel list

# Check Vercel
vercel list

echo "Infrastructure deployment complete!" 