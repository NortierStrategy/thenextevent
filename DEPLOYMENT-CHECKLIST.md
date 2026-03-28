# Deployment Checklist — The Next Event

**Validez cette checklist avant tout déploiement en production.**

---

## Pre-Deployment (Before PR)

### Code Quality
- [ ] `npx tsc --noEmit` → 0 errors
- [ ] `npm run lint` → 0 errors
- [ ] `npm audit` → 0 vulnerabilities (or reviewed and accepted)
- [ ] No unused variables (check TypeScript output)
- [ ] No console.log in production code (except error logging)
- [ ] All API routes have try/catch blocks

### Security
- [ ] CSRF token validation in place (checkCsrf)
- [ ] Rate limiting implemented (checkRateLimit)
- [ ] Input validation with Zod schemas
- [ ] SQL injection not applicable (no DB queries)
- [ ] XSS prevention with escapeHtml
- [ ] No hardcoded secrets in code
- [ ] env.local example file has placeholders
- [ ] All sensitive env vars start with correct prefix (NEXT_PUBLIC_ vs not)

### Testing
- [ ] Contact form tested (manual)
- [ ] Recruit form tested (manual)
- [ ] Email notifications tested (check console)
- [ ] Error messages display correctly
- [ ] Mobile responsiveness verified
- [ ] Analytics consent flow working
- [ ] No broken links on pages

### Environment Variables
- [ ] RESEND_API_KEY configured
- [ ] HUBSPOT_ACCESS_TOKEN configured (or undefined, service gracefully skipped)
- [ ] MAKE_WEBHOOK_URL configured (or undefined)
- [ ] NEXT_PUBLIC_* tracking IDs configured OR commented out
- [ ] NEXT_PUBLIC_CALENDLY_URL set correctly
- [ ] NODE_ENV=production in deployment target

### Performance
- [ ] `npm run build` completes without warnings
- [ ] Build size reasonable (check .next folder)
- [ ] No excessive bundle size warnings
- [ ] Images optimized (no oversized image files)
- [ ] No missing alt text on <Image /> components

### Documentation
- [ ] README.md updated if applicable
- [ ] Code comments for complex logic
- [ ] .env.local.example fully documented
- [ ] API route error messages are user-friendly

---

## During Deployment

### Vercel/Platform Specific
- [ ] Environment variables added to production settings
- [ ] Build settings correct (next build)
- [ ] No overrides for Node version (use default 18+)
- [ ] Edge Function not required for this project
- [ ] Revalidation strategy set (ISR if needed)

### Domain & DNS
- [ ] Domain points to correct deployment
- [ ] SSL certificate valid
- [ ] www and non-www variants handled
- [ ] Redirects configured if needed

### Monitoring
- [ ] Error tracking set up (Sentry, LogRocket, etc.)
- [ ] Analytics tracking IDs loaded (verify with dev tools)
- [ ] Uptime monitoring enabled
- [ ] Alerts configured for errors/downtime

---

## Post-Deployment

### Smoke Tests (First Hour)
- [ ] Homepage loads without errors
- [ ] All pages accessible (fr + en locales)
- [ ] Contact form submits successfully
- [ ] Recruit form submits successfully
- [ ] No JavaScript errors in console
- [ ] CSS loads correctly (no unstyled content flash)
- [ ] Images load correctly
- [ ] Analytics tracking fires (check Network tab)

### Functional Tests
- [ ] Contact form email received by [nicola@thenextevent.fr]
- [ ] Recruit form email received by [recrutement@thenextevent.fr]
- [ ] HubSpot contact created (if token configured)
- [ ] Make.com webhook received (if URL configured)
- [ ] Rate limiting works (test 6+ requests in 60 seconds)
- [ ] CSRF protection works (test invalid origin)

### Client Communication
- [ ] All stakeholders notified of deployment
- [ ] Monitoring dashboard shared with team
- [ ] Rollback plan documented (if needed)
- [ ] Status page updated if applicable

### Analytics Verification
- [ ] Google Analytics receiving data
- [ ] Google Tag Manager firing
- [ ] Meta Pixel tracking (if configured)
- [ ] LinkedIn Insight Tag firing (if configured)

---

## Rollback Plan

**If production issues detected:**

1. Identify root cause
   ```bash
   # Check deployment logs
   # Review error tracking (Sentry, etc.)
   # Check database/API health
   ```

2. If code issue:
   ```bash
   # Revert to previous deployment
   # OR redeploy previous git commit
   ```

3. If configuration issue:
   ```bash
   # Fix environment variables
   # Redeploy without code changes
   ```

4. If infrastructure issue:
   ```bash
   # Contact platform support (Vercel, etc.)
   # Check DNS configuration
   # Verify SSL certificates
   ```

5. Notify stakeholders
   - Estimated time to fix
   - What's affected
   - What's working

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | | | |
| QA | | | |
| Operations | | | |
| Product Owner | | | |

---

## Post-Deployment Review (24h After)

- [ ] No spike in error logs
- [ ] No performance degradation
- [ ] All analytics firing normally
- [ ] User feedback positive (if any)
- [ ] Monitoring alerts not triggered
- [ ] Database/external APIs responding normally

---

## Common Issues & Solutions

### Issue: Contact form stuck on "sending"
**Solution:** Check RESEND_API_KEY and network logs. May need to retry.

### Issue: Emails not received
**Solution:** Check Resend API logs, verify email domain configured.

### Issue: Rate limiting too strict
**Solution:** Adjust RATE_LIMIT in src/lib/api/security.ts (default: 5 per minute)

### Issue: CORS errors from analytics
**Solution:** Ensure ALLOWED_ORIGINS includes production domain in security.ts

### Issue: HubSpot contact not created
**Solution:** Verify HUBSPOT_ACCESS_TOKEN has correct permissions. Service fails silently if invalid.

### Issue: High memory usage
**Solution:** Rate limit map may be growing. Check if cleanup running properly in security.ts

---

## Maintenance Reminders

**Monthly:**
- Review error logs
- Check analytics are working
- Monitor uptime

**Quarterly:**
- Audit npm dependencies
- Check for security updates
- Review API rate limits and adjust if needed

**Annually:**
- Full security audit
- Performance optimization review
- Dependency major version upgrades

---

## Deployment Command Reference

```bash
# Local verification
npm run build          # Build production bundle
npm run dev           # Test locally before deployment

# Vercel deployment (automatic on git push)
git push origin main

# Manual Vercel deployment (if needed)
vercel deploy --prod

# Check deployment status
vercel ls
vercel status
```

---

## Contact

For deployment issues:
- **DevOps:** [Contact]
- **Backend:** [Contact]
- **Frontend:** [Contact]
- **Nicola (Product):** nicola@thenextevent.fr

---

**Last Updated:** 28 Mars 2026
**Next Review:** 1 Avril 2026
