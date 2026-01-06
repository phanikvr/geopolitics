# Editorial Geopolitics — Drafts & Publishing

**Purpose**
This private repository stores drafts, source notes, and the static site build for an editorial project focused on geopolitical analysis and opinion pieces.

**What’s in this repo**
- **/content** — Markdown drafts and source citations.
- **/themes** — Hugo theme and custom templates.
- **/public** — Generated static site (build output).
- **/scripts** — Build and deployment helpers.
- **/notes** — Research, source links, and fact‑checks.

**How to work locally**
1. Install Hugo (Windows): download the official Windows ZIP, extract `hugo.exe`, and add to PATH.  
2. Create a draft: `hugo new posts/your-title.md`.  
3. Preview: `hugo server -D` and open `http://localhost:1313`.

**Editorial policy (summary)**
- **Sourcing:** every claim must include at least one verifiable source in the front matter.  
- **Corrections:** publish corrections in `/corrections` and update the original post with a correction note.  
- **Legal caution:** avoid unverified allegations; consult legal counsel for sensitive claims.

**Publishing workflow**
- Draft → Peer review → Fact‑check → Merge to `main` → CI builds site → Deploy to private Pages or staging server.

**Contact**
Editor: **Venkat** — replace with preferred contact email.

**License**
Content in this repo is **private**. Specify a license or internal usage terms here.

