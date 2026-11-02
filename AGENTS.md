<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the contact form and public GitHub contribution calendar in a dedicated contact-panels module; email drafts use mailto and public contribution data is loaded in the browser without credentials.
- Keep contribution date filtering in a browser-safe pure helper with inclusive UTC date boundaries so calendar cells and totals use the same selected period.
