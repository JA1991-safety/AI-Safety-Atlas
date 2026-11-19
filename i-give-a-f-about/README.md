# I Give a F*** About

A page for people moving into AI safety. Visitors pick up to three risks they care about, scroll through the organisations working on each one (each risk's illustration clears as they go), and finish with a shareable card and a shortlist of jobs links.

## Files

- `index.html`: the page itself.
- `data.js`: the risks and organisations. Edit this file to add, remove or update an organisation. The comment at the top explains each field.
- `scenes.js`: the illustration for each risk.

## Before launch

- **Suggestion form.** Suggestions are emailed to igiveafabout@gmail.com through [FormSubmit](https://formsubmit.co), which needs no account. The first time someone submits the form on the live site, FormSubmit sends an activation email to that inbox. Click the link in it, and every later suggestion arrives as an email. The suggester's email, if they give one, is set as the reply-to address. To change the address, edit `SUGGEST_ENDPOINT` near the top of the script in `index.html`.
- **Optional, to cut spam:** after activation, FormSubmit's email gives you a random string that can stand in for the address in `SUGGEST_ENDPOINT`. Using it keeps the Gmail address out of the page source.
- **Fact-check.** The organisation descriptions and the role tags are short summaries. Check them against each organisation's own site.

## Publishing with GitHub Pages

1. The repository must be public. On a free GitHub plan, Pages only works for public repositories.
2. In the repository, go to Settings → Pages → Build and deployment, choose "Deploy from a branch", pick `main` and `/ (root)`, and save.
3. After a minute or two, the page is live at `https://ja1991-safety.github.io/AI-Safety-Atlas/i-give-a-f-about/`.

The empty `.nojekyll` file at the repository root tells GitHub Pages to serve the files exactly as they are.

My list is stored in each visitor's own browser, so the site needs no accounts or server.
