# Domain Setup Guide: scbalab.com

Complete guide to purchasing and connecting your custom domain to your Notion blog.

## Overview

**Domain**: scbalab.com
**Current URL**: https://notion-blog-cosqyu0km-sunghun-juns-projects.vercel.app
**Target**: https://scbalab.com

---

## Step 1: Purchase the Domain (15 minutes)

### Recommended Registrars

#### Option 1: Namecheap (Recommended - Easy & Affordable)
**Website**: https://www.namecheap.com

**Pros:**
- ✅ Affordable pricing (~$10-15/year for .lab)
- ✅ Free WHOIS privacy
- ✅ Easy DNS management
- ✅ Good customer support

**Steps:**
1. Go to https://www.namecheap.com
2. Search for "scbalab.com"
3. Add to cart
4. Create account or log in
5. Complete purchase
6. **Important**: Enable Auto-Renew (avoid losing domain)

#### Option 2: Google Domains
**Website**: https://domains.google

**Pros:**
- ✅ Clean interface
- ✅ Integrated with Google services
- ✅ Free privacy protection

#### Option 3: Cloudflare Registrar
**Website**: https://www.cloudflare.com/products/registrar/

**Pros:**
- ✅ At-cost pricing (no markup)
- ✅ Free DNS management
- ✅ Built-in security features

**Note**: Cloudflare requires existing Cloudflare account.

### What to Expect

**Pricing for .lab domain:**
- First year: $10-20
- Renewal: $15-25/year
- WHOIS privacy: Usually free (check registrar)

**Purchase includes:**
- Domain registration for 1 year
- DNS management
- Email forwarding (usually)
- SSL certificate (from Vercel, free)

---

## Step 2: Add Domain to Vercel (10 minutes)

Once you've purchased the domain:

### 2.1 Log into Vercel

1. Go to https://vercel.com
2. Log in with your GitHub account
3. Navigate to your project: `notion-blog`

### 2.2 Add Custom Domain

1. Click on your project (`notion-blog`)
2. Go to **Settings** tab
3. Click **Domains** in left sidebar
4. Click **Add** button

5. Enter your domain:
   ```
   scbalab.com
   ```

6. Click **Add**

7. Vercel will also suggest adding:
   ```
   www.scbalab.com
   ```

   **Recommendation**: Add both
   - `scbalab.com` (primary)
   - `www.scbalab.com` (redirects to primary)

### 2.3 Vercel Will Show DNS Configuration

Vercel will display DNS records you need to add. It will look like:

**For apex domain (scbalab.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain (www.scbalab.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Keep this page open** - you'll need these values in the next step.

---

## Step 3: Configure DNS Settings (15 minutes)

Now configure DNS at your domain registrar.

### 3.1 Access DNS Management

**Namecheap:**
1. Log into Namecheap
2. Go to **Dashboard** → **Domain List**
3. Click **Manage** next to scbalab.com
4. Click **Advanced DNS** tab

**Google Domains:**
1. Log into Google Domains
2. Click on scbalab.com
3. Click **DNS** in left sidebar

**Cloudflare:**
1. Log into Cloudflare
2. Select scbalab.com
3. Click **DNS** tab

### 3.2 Add DNS Records

Add the records Vercel provided:

#### Record 1: Apex Domain (scbalab.com)

```
Type: A
Host: @ (or leave blank)
Value: 76.76.21.21
TTL: Automatic (or 3600)
```

#### Record 2: WWW Subdomain (www.scbalab.com)

```
Type: CNAME
Host: www
Value: cname.vercel-dns.com
TTL: Automatic (or 3600)
```

### 3.3 Remove Conflicting Records

**Important**: Remove any existing records that conflict:
- Delete any existing A records for `@`
- Delete any existing CNAME records for `www`
- Delete parking page redirects

### 3.4 Save Changes

Click **Save** or **Save All Changes**

---

## Step 4: Wait for DNS Propagation (15 minutes - 48 hours)

DNS changes take time to propagate globally.

### Expected Timeline

- **Minimum**: 15 minutes
- **Average**: 1-2 hours
- **Maximum**: 48 hours (rare)

### Check Propagation Status

Use these tools to check if DNS is propagating:

1. **DNS Checker**: https://dnschecker.org
   - Enter: `scbalab.com`
   - Should show Vercel's IP: `76.76.21.21`

2. **WhatsMyDNS**: https://www.whatsmydns.net
   - Enter: `scbalab.com`
   - Check globally

3. **Terminal (Mac/Linux)**:
   ```bash
   dig scbalab.com
   # Should show: 76.76.21.21

   dig www.scbalab.com
   # Should show: CNAME to vercel
   ```

### During Propagation

Vercel will show one of these statuses:
- ⏳ **Pending** - Waiting for DNS
- ⚠️ **Invalid Configuration** - DNS not set correctly
- ✅ **Valid Configuration** - DNS propagated!

---

## Step 5: Enable SSL Certificate (Automatic)

Once DNS propagates, Vercel automatically:

1. ✅ Detects domain is pointing to Vercel
2. ✅ Issues free SSL certificate (Let's Encrypt)
3. ✅ Enables HTTPS
4. ✅ Redirects HTTP → HTTPS

**No action needed** - this happens automatically!

### Verify SSL

1. Visit: https://scbalab.com
2. Look for 🔒 padlock in browser
3. Certificate should be valid

---

## Step 6: Update Environment Variables (5 minutes)

Update your site URL in environment variables.

### 6.1 Update Vercel Environment Variables

1. In Vercel, go to your project
2. Click **Settings** → **Environment Variables**
3. Find `NEXT_PUBLIC_SITE_URL`
4. Edit value to:
   ```
   https://scbalab.com
   ```
5. Click **Save**

### 6.2 Update Local .env.local

```bash
# Edit your local file
NEXT_PUBLIC_SITE_URL=https://scbalab.com
NEXT_PUBLIC_SITE_NAME=SCBA.Lab
```

### 6.3 Trigger Redeploy

In Vercel:
1. Go to **Deployments** tab
2. Click **...** on latest deployment
3. Click **Redeploy**
4. Check "Use existing Build Cache"
5. Click **Redeploy**

Or push a small change to trigger deployment:

```bash
# Update README with new URL
git commit --allow-empty -m "Update site URL to scbalab.com"
git push origin main
```

---

## Step 7: Test Your Domain (5 minutes)

### ✅ Checklist

Test all these URLs:

- [ ] http://scbalab.com → Redirects to https://scbalab.com ✅
- [ ] https://scbalab.com → Loads your blog ✅
- [ ] http://www.scbalab.com → Redirects to https://scbalab.com ✅
- [ ] https://www.scbalab.com → Redirects to https://scbalab.com ✅
- [ ] Old Vercel URL still works (as fallback) ✅

### Test Individual Pages

- [ ] Homepage: https://scbalab.com
- [ ] All Posts: https://scbalab.com/posts
- [ ] Individual Post: https://scbalab.com/posts/building-blog-with-ai-one-day
- [ ] 404 Page: https://scbalab.com/nonexistent-page

### Test Social Sharing

1. Share on social media (X, LinkedIn)
2. Check preview shows correct domain
3. Verify metadata displays properly

---

## Step 8: Update Documentation (5 minutes)

Update all references to use new domain.

### Files to Update

```bash
# README.md
# DEPLOYMENT.md
# content/first-post/blog-post.md
# guides/README.md
# Any other files referencing the Vercel URL
```

I can help you update these files once your domain is live!

---

## Troubleshooting

### Issue: "Invalid Configuration" in Vercel

**Cause**: DNS not pointing to Vercel yet

**Solutions:**
1. Double-check DNS records match Vercel's requirements exactly
2. Wait longer (DNS can take up to 48 hours)
3. Clear DNS cache:
   ```bash
   # Mac
   sudo dscacheutil -flushcache
   sudo killall -HUP mDNSResponder

   # Windows
   ipconfig /flushdns
   ```

### Issue: SSL Certificate Not Issuing

**Cause**: Domain not fully propagated

**Solutions:**
1. Wait for DNS to fully propagate
2. Check domain points to correct Vercel IP
3. Remove the domain and re-add it in Vercel

### Issue: "www" Not Redirecting

**Cause**: CNAME record not set correctly

**Solution:**
1. Verify CNAME record for `www` points to `cname.vercel-dns.com`
2. Check for conflicting A records on `www`

### Issue: Old Vercel URL Still Shows

**Cause**: Normal - old URL always works

**Solution:**
- This is expected behavior
- Old URL remains as backup
- Can't be disabled (Vercel feature)

---

## Cost Breakdown

**One-Time Costs:**
- Domain registration: $10-20 (first year)

**Annual Costs:**
- Domain renewal: $15-25/year
- Vercel hosting: $0 (free tier is sufficient)
- SSL certificate: $0 (included with Vercel)

**Total Annual Cost**: ~$15-25/year

---

## Quick Reference

### DNS Records for scbalab.com

```
# Apex domain
Type: A
Host: @
Value: 76.76.21.21

# WWW subdomain
Type: CNAME
Host: www
Value: cname.vercel-dns.com
```

### Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=https://scbalab.com
NEXT_PUBLIC_SITE_NAME=SCBA.Lab
```

---

## Timeline Summary

```
[0 min]     Purchase domain (scbalab.com)
[15 min]    Add domain to Vercel
[30 min]    Configure DNS at registrar
[45 min]    Wait for DNS propagation (15 min - 48 hrs)
[1 hr]      SSL certificate issued automatically
[1 hr 5]    Update environment variables
[1 hr 10]   Test domain
[1 hr 15]   Update documentation
[DONE]      Domain live at https://scbalab.com 🎉
```

---

## Next Steps After Domain is Live

1. **Update social media** bios with new URL
2. **Update business cards** / resume with new URL
3. **Set up email forwarding** (optional)
   - hello@scbalab.com → your personal email
4. **Monitor analytics** to see traffic on new domain
5. **Update blog posts** to reference new domain

---

## Email Forwarding (Optional)

Want to use hello@scbalab.com?

Most registrars offer free email forwarding:

**Namecheap:**
1. Dashboard → Domain List → Manage
2. Click "Email Forwarding"
3. Add forwarding rule:
   ```
   hello@scbalab.com → your-personal-email@gmail.com
   ```

**Google Domains:**
1. Domain settings → Email
2. Add email forward

**Cloudflare:**
1. Email → Email Routing
2. Set up forwarding (free)

---

## Important Notes

### Domain Ownership
- ✅ Keep auto-renew enabled
- ✅ Keep registrar account credentials safe
- ✅ Set calendar reminder 30 days before expiration
- ✅ Use strong password + 2FA on registrar account

### Security
- ✅ Enable domain lock (prevent unauthorized transfers)
- ✅ Enable WHOIS privacy (hide personal info)
- ✅ Use registrar's 2FA
- ✅ Keep backup of DNS settings

### Maintenance
- 📅 Renew domain annually
- 📅 Check DNS settings if issues occur
- 📅 Monitor SSL certificate (auto-renews every 90 days)

---

## Getting Help

**Vercel Issues:**
- Docs: https://vercel.com/docs/concepts/projects/custom-domains
- Support: https://vercel.com/support

**DNS Issues:**
- Check propagation: https://dnschecker.org
- DNS learning: https://www.cloudflare.com/learning/dns/what-is-dns/

**Registrar Issues:**
- Contact your registrar's support
- Most have 24/7 chat support

---

**Ready to get started? Follow Step 1 to purchase your domain!** 🚀
