# Quick Vercel Domain Setup for scbalab.com

Step-by-step guide to connect your scbalab.com domain to Vercel.

---

## Step 1: Add Domain to Vercel (5 minutes)

### 1.1 Log into Vercel

1. Go to **https://vercel.com**
2. Log in with your GitHub account
3. Navigate to your **notion-blog** project

### 1.2 Add Custom Domain

1. Click on your **notion-blog** project
2. Go to **Settings** tab (top navigation)
3. Click **Domains** in the left sidebar
4. Click **Add** or **Add Domain** button

### 1.3 Enter Your Domains

**Add both these domains:**

```
scbalab.com
```

Click **Add** → Vercel will configure this as your primary domain

```
www.scbalab.com
```

Click **Add** → Vercel will redirect this to scbalab.com

### 1.4 Copy DNS Records

Vercel will show you the DNS records needed. They should look like:

**For scbalab.com (apex domain):**
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
```

**For www.scbalab.com:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**🔴 IMPORTANT: Keep this page open!** You'll need these values for the next step.

---

## Step 2: Configure DNS at Your Registrar (10 minutes)

Now you need to add these DNS records at your domain registrar (wherever you bought scbalab.com).

### If you used Namecheap:

1. **Log into Namecheap**: https://www.namecheap.com
2. Click **Account** → **Domain List**
3. Find **scbalab.com** → Click **Manage**
4. Click **Advanced DNS** tab

**Add these records:**

**Record 1 - Apex Domain:**
```
Type: A Record
Host: @
Value: 76.76.21.21
TTL: Automatic
```

**Record 2 - WWW:**
```
Type: CNAME Record
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

5. **Remove any conflicting records** (old A records, parking page redirects)
6. Click **Save All Changes**

---

### If you used GoDaddy:

1. **Log into GoDaddy**: https://www.godaddy.com
2. Go to **My Products** → **Domains**
3. Click on **scbalab.com**
4. Scroll to **DNS Records** → Click **Manage**

**Add these records:**

**Record 1:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 1 hour
```

**Record 2:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 1 hour
```

5. **Delete any existing A records or CNAME records** that conflict
6. Click **Save**

---

### If you used Google Domains (Squarespace):

1. **Log into Google Domains**: https://domains.google.com
2. Click on **scbalab.com**
3. Click **DNS** in the left sidebar
4. Scroll to **Custom resource records**

**Add Record 1:**
```
Name: @ (or leave blank)
Type: A
TTL: 1h
Data: 76.76.21.21
```

**Add Record 2:**
```
Name: www
Type: CNAME
TTL: 1h
Data: cname.vercel-dns.com
```

5. Click **Add** for each record
6. **Remove** any conflicting records

---

### If you used Porkbun:

1. **Log into Porkbun**: https://porkbun.com
2. Click **Domain Management**
3. Click **scbalab.com** → **DNS**

**Add Record 1:**
```
Type: A
Host: (leave blank)
Answer: 76.76.21.21
TTL: 600
```

**Add Record 2:**
```
Type: CNAME
Host: www
Answer: cname.vercel-dns.com
TTL: 600
```

4. Click **Add** for each
5. **Delete** any existing A or CNAME records that conflict
6. Changes save automatically

---

### If you used Cloudflare:

1. **Log into Cloudflare**: https://dash.cloudflare.com
2. Select **scbalab.com**
3. Go to **DNS** tab

**Add Record 1:**
```
Type: A
Name: @
IPv4 address: 76.76.21.21
Proxy status: DNS only (gray cloud, NOT orange)
TTL: Auto
```

**Add Record 2:**
```
Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy status: DNS only (gray cloud, NOT orange)
TTL: Auto
```

**⚠️ IMPORTANT:** Make sure Proxy Status is **DNS only** (gray cloud icon), NOT proxied (orange cloud)

4. Click **Save** for each record

---

## Step 3: Wait for DNS Propagation (15 min - 2 hours)

DNS changes need time to propagate globally.

### Expected Timeline

- **Minimum**: 15-30 minutes
- **Typical**: 1-2 hours
- **Maximum**: 24-48 hours (rare)

### Check Status in Vercel

1. Go back to Vercel → Your Project → Settings → Domains
2. You'll see one of these statuses:

   - ⏳ **Pending** - Waiting for DNS propagation
   - ⚠️ **Invalid Configuration** - DNS not set up correctly
   - ✅ **Valid Configuration** - DNS working! Domain is live!

### Check DNS Propagation Manually

**Option 1: Online Checker**
- Go to https://dnschecker.org
- Enter: `scbalab.com`
- Should show: `76.76.21.21`

**Option 2: Terminal (Mac/Linux)**
```bash
dig scbalab.com

# Should show:
# scbalab.com.  IN  A  76.76.21.21
```

**Option 3: Browser**
- Try visiting `http://scbalab.com`
- If it shows Vercel 404 → DNS is working! (Just waiting for SSL)

---

## Step 4: SSL Certificate (Automatic - 5-10 minutes)

Once DNS propagates, Vercel **automatically**:

1. ✅ Detects domain points to Vercel
2. ✅ Issues free SSL certificate (Let's Encrypt)
3. ✅ Enables HTTPS
4. ✅ Redirects HTTP → HTTPS automatically

**You don't need to do anything!**

### Verify SSL is Working

1. Visit: **https://scbalab.com**
2. Check for 🔒 padlock icon in browser address bar
3. Click padlock → Certificate should be valid

If you see SSL certificate error, wait a few more minutes - it's still being issued.

---

## Step 5: Update Environment Variables in Vercel (5 minutes)

Now that your domain is working, update the site URL.

### 5.1 Update in Vercel Dashboard

1. Go to **Vercel** → **notion-blog** → **Settings**
2. Click **Environment Variables**
3. Find `NEXT_PUBLIC_SITE_URL`
4. Click **Edit**
5. Change value to:
   ```
   https://scbalab.com
   ```
6. Click **Save**

### 5.2 Redeploy Your Site

After updating environment variables:

1. Go to **Deployments** tab
2. Click **...** (three dots) on the latest deployment
3. Click **Redeploy**
4. ✅ Check "Use existing Build Cache"
5. Click **Redeploy**

Or just push a change to GitHub to trigger automatic deployment.

---

## Step 6: Test Everything (5 minutes)

### ✅ Test Checklist

Open each of these URLs and verify they work:

- [ ] **http://scbalab.com** → Should redirect to https://scbalab.com ✅
- [ ] **https://scbalab.com** → Should load your blog ✅
- [ ] **http://www.scbalab.com** → Should redirect to https://scbalab.com ✅
- [ ] **https://www.scbalab.com** → Should redirect to https://scbalab.com ✅

### Test Individual Pages

- [ ] Homepage: https://scbalab.com
- [ ] Posts list: https://scbalab.com/posts
- [ ] Individual post: https://scbalab.com/posts/building-blog-with-ai-one-day
- [ ] 404 page: https://scbalab.com/this-page-does-not-exist

### Test on Mobile

- [ ] Open https://scbalab.com on your phone
- [ ] Check it loads correctly
- [ ] Test navigation works

---

## Step 7: Update Local Environment (2 minutes)

Update your local `.env.local` file:

```bash
# Open .env.local and update:
NEXT_PUBLIC_SITE_URL=https://scbalab.com
NEXT_PUBLIC_SITE_NAME=SCBA.Lab
```

Test locally:
```bash
npm run dev
# Visit http://localhost:3000
# Metadata should reference scbalab.com
```

---

## Troubleshooting

### "Invalid Configuration" in Vercel

**Cause**: DNS records not set correctly or not propagated yet

**Solutions**:
1. Double-check DNS records match exactly what Vercel shows
2. Make sure you removed any conflicting old records
3. Wait longer (can take up to 48 hours)
4. Try removing and re-adding the domain in Vercel

### SSL Certificate Not Issuing

**Cause**: DNS not fully propagated yet

**Solutions**:
1. Wait 30 more minutes
2. Check DNS is pointing to Vercel correctly (dig scbalab.com)
3. Try removing and re-adding domain in Vercel
4. Check Cloudflare proxy is OFF (gray cloud) if using Cloudflare

### "www" Not Redirecting Properly

**Cause**: CNAME record incorrect

**Solutions**:
1. Verify CNAME record: `www` → `cname.vercel-dns.com`
2. Remove any A records for `www` subdomain
3. Wait for DNS propagation

### Domain Shows Old Vercel URL

**Cause**: Environment variables not updated

**Solutions**:
1. Update `NEXT_PUBLIC_SITE_URL` in Vercel settings
2. Redeploy the site
3. Clear browser cache

### Can't Access Site at All

**Cause**: DNS not propagated yet or wrong IP

**Solutions**:
1. Check DNS propagation: https://dnschecker.org
2. Verify A record points to `76.76.21.21`
3. Wait more time for propagation
4. Try from different network/device

---

## Quick Command Reference

### Check DNS (Mac/Linux)
```bash
# Check A record
dig scbalab.com

# Check CNAME
dig www.scbalab.com

# Flush local DNS cache (Mac)
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
```

### Test SSL
```bash
# Check SSL certificate
curl -I https://scbalab.com

# Should return 200 OK
```

---

## Timeline Summary

```
✅ Add domain to Vercel:          5 minutes
✅ Configure DNS at registrar:    10 minutes
⏳ Wait for DNS propagation:      15 min - 2 hours
⏳ SSL certificate issued:         5-10 minutes (automatic)
✅ Update environment variables:   5 minutes
✅ Test everything:                5 minutes
───────────────────────────────────────────
Total active time:                ~30 minutes
Total elapsed time:               1-3 hours
```

---

## Success! 🎉

When everything is working, you should see:

✅ **https://scbalab.com** loads your blog
✅ 🔒 **SSL padlock** shows in browser
✅ **All pages work** (posts, homepage, etc.)
✅ **www redirects** to main domain
✅ **HTTP redirects** to HTTPS

---

## What's Next?

After your domain is live:

1. **Update social media** profiles with new URL
2. **Update GitHub README** (I can help with this)
3. **Update blog posts** that reference old URL
4. **Set up email forwarding** (hello@scbalab.com)
5. **Share your new site!** 🚀

---

**Need help with any step? Let me know where you are and I'll guide you through it!**
