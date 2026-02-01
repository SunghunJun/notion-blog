# Domain Testing Checklist for scbalab.com

Complete checklist to verify your domain is working correctly.

---

## ✅ URL Redirect Tests

Test each URL and verify it redirects correctly:

### Apex Domain Tests
- [ ] **http://scbalab.com**
  - Should redirect to: `https://scbalab.com` ✅
  - Status: 301 or 308 redirect

- [ ] **https://scbalab.com**
  - Should load: Your blog homepage ✅
  - Status: 200 OK
  - Shows: 🔒 SSL padlock in browser

### WWW Subdomain Tests
- [ ] **http://www.scbalab.com**
  - Should redirect to: `https://scbalab.com` ✅
  - Status: 301 or 308 redirect

- [ ] **https://www.scbalab.com**
  - Should redirect to: `https://scbalab.com` ✅
  - Status: 301 or 308 redirect

---

## ✅ Page Load Tests

Verify all pages work correctly:

### Homepage
- [ ] Visit: https://scbalab.com
  - Loads correctly ✅
  - Shows your blog posts ✅
  - Navigation works ✅

### Posts List
- [ ] Visit: https://scbalab.com/posts
  - Shows all posts ✅
  - Post links work ✅

### Individual Post
- [ ] Visit: https://scbalab.com/posts/building-blog-with-ai-one-day
  - Post loads ✅
  - Content displays correctly ✅
  - Code blocks render ✅

### 404 Page
- [ ] Visit: https://scbalab.com/nonexistent-page
  - Shows 404 error page ✅
  - Navigation back to home works ✅

---

## ✅ SSL Certificate Tests

### Browser Tests
- [ ] **Padlock Icon**: 🔒 Shows in address bar
- [ ] **Click padlock** → Certificate info
  - Issued to: scbalab.com ✅
  - Issued by: Let's Encrypt ✅
  - Valid until: (future date) ✅
  - No warnings ✅

### Command Line Test (Mac/Linux)
```bash
curl -I https://scbalab.com

# Should return:
# HTTP/2 200
# (no SSL errors)
```

---

## ✅ Metadata Tests

Check that your site metadata references the correct domain:

### View Page Source
1. Visit: https://scbalab.com
2. Right-click → **View Page Source**
3. Search for `<meta` tags
4. Verify shows:
   - [ ] `og:url` contains `https://scbalab.com`
   - [ ] `og:site_name` is "SCBA.Lab"
   - [ ] `canonical` URL is `https://scbalab.com`

### Social Sharing Test
1. Share on X/Twitter or LinkedIn
2. Check preview shows:
   - [ ] Domain: scbalab.com (not Vercel URL)
   - [ ] Site name: SCBA.Lab
   - [ ] Image preview loads (if applicable)

---

## ✅ Mobile Tests

### iPhone/Android
- [ ] Visit: https://scbalab.com on mobile
  - Loads correctly ✅
  - Responsive design works ✅
  - Navigation works ✅
  - Images load ✅

### Different Networks
- [ ] Test on WiFi
- [ ] Test on mobile data
- [ ] Both work correctly ✅

---

## ✅ Performance Tests

### Speed Test
1. Visit: https://pagespeed.web.dev
2. Enter: `https://scbalab.com`
3. Run test
4. Check scores:
   - [ ] Performance: > 90
   - [ ] Accessibility: > 90
   - [ ] Best Practices: > 90
   - [ ] SEO: > 90

### Load Time
- [ ] Homepage loads in < 2 seconds
- [ ] Individual posts load in < 2 seconds
- [ ] Images load properly

---

## ✅ SEO Tests

### Google Search Console (Optional)
1. Go to: https://search.google.com/search-console
2. Add property: https://scbalab.com
3. Verify ownership
4. Submit sitemap: https://scbalab.com/sitemap.xml

### Robots.txt
- [ ] Visit: https://scbalab.com/robots.txt
  - File exists ✅
  - No blocking rules for important pages ✅

### Sitemap
- [ ] Visit: https://scbalab.com/sitemap.xml
  - XML sitemap loads ✅
  - Contains your blog posts ✅

---

## ✅ Old URL Tests

Verify old Vercel URL still works (as backup):

- [ ] Visit: https://notion-blog-cosqyu0km-sunghun-juns-projects.vercel.app
  - Should still work (Vercel keeps old URLs active)
  - Can redirect to new domain (optional)

---

## ✅ Email Tests (If Set Up)

If you configured email forwarding:

- [ ] Send test email to: hello@scbalab.com
- [ ] Email arrives at your personal email ✅
- [ ] Reply works correctly ✅

---

## ✅ Analytics (Optional)

If you have analytics installed:

- [ ] Analytics tracking scbalab.com correctly
- [ ] Page views recorded
- [ ] No 404s from broken links

---

## 🚨 Troubleshooting

### If Something Doesn't Work:

**Issue: Old Vercel URL still shows in metadata**
- Solution: Redeploy site after updating environment variables

**Issue: SSL warning or "Not Secure"**
- Solution: Wait 5-10 more minutes for SSL to fully propagate

**Issue: 404 on all pages**
- Solution: Check Vercel deployment succeeded

**Issue: Images not loading**
- Solution: Clear browser cache, hard refresh (Cmd+Shift+R)

**Issue: Mobile site different than desktop**
- Solution: Clear mobile browser cache

---

## ✅ Final Verification

Once all tests pass:

- [ ] ✅ All URLs redirect correctly
- [ ] ✅ SSL certificate valid
- [ ] ✅ All pages load
- [ ] ✅ Metadata correct
- [ ] ✅ Mobile works
- [ ] ✅ Performance good

**If all checked → Domain setup complete!** 🎉

---

## 📝 Post-Launch Tasks

After everything works:

1. **Update social media** profiles with new URL
2. **Update GitHub README** with scbalab.com
3. **Update business cards** / resume
4. **Set up Google Search Console**
5. **Set up analytics** (if not already)
6. **Announce your new domain!** 🚀

---

**Status**: Domain live at https://scbalab.com ✅
**SSL**: Valid and secure 🔒
**Performance**: Optimized ⚡
**Ready**: To share with the world! 🌍
