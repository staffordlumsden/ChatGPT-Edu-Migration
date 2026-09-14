# ChatGPT (Edu) Migration

A guided, browser-based workflow for moving useful personal AI context from the assistants you already use into **ChatGPT Edu** without starting again from zero.

The project is built around a **Portable Personal Harness**: a user-controlled, platform-neutral description of the durable context that helps an AI system work effectively with you. This can include professional context, recurring expertise, working preferences, authorial voice, evidence expectations, preferred workflows and durable boundaries.

The aim is not to export every conversation or recreate an AI account. It is to carry forward the **smallest useful set of context** that makes a new AI environment recognise how you work.

## Live site

Once GitHub Pages is enabled for this repository, the site will be available at:

**https://staffordlumsden.github.io/ChatGPT-Edu-Migration/**

## What the app does

The web app walks a user through four stages:

### 1. Extract

**Ask each AI what it knows.**

Run the same extraction prompt in each AI assistant that has useful history or personalisation about you. The prompt asks each system to produce a portable Markdown profile containing durable context rather than a conversation summary.

Typical sources might include:

- a personal ChatGPT account;
- Microsoft 365 Copilot;
- Gemini;
- Claude;
- another AI system that has accumulated useful context about the user.

Each source produces a separate `personal-harness` output.

### 2. Reconcile

**Create one master harness.**

Attach or paste the outputs from Stage 1 into a preferred AI tool and run the reconciliation prompt.

The reconciliation stage is designed to do more than concatenate files. It asks the AI to:

- remove duplication;
- distinguish direct user statements from AI inference;
- prefer repeated and strongly supported evidence;
- preserve useful complementary information;
- flag genuine conflicts;
- keep project-specific material separate from global personal context;
- identify potentially outdated information;
- treat sensitive information conservatively.

The result is a **Master Portable Personal Harness** that acts as the platform-neutral source of truth.

### 3. Integrate

**Move durable context into ChatGPT Edu.**

Open ChatGPT Edu, attach or paste the Master Harness, then run the integration prompt.

The integration stage asks ChatGPT to retain only the durable information that is appropriate for persistent personalisation or Memory. It explicitly avoids promoting temporary projects, volatile technical details, uncertain claims or sensitive information into permanent context.

Because Memory and personalisation settings vary between ChatGPT workspaces, the prompt also requires ChatGPT to state clearly whether persistence is available and whether the user needs to take any further action.

### 4. Recognise

**Test it in a new chat.**

The final stage is a clean recognition check. Start a new ChatGPT conversation and run the recognition prompt.

A successful migration should allow ChatGPT to describe, without relying on the migration conversation itself:

- who it understands the user to be;
- how the user prefers to work;
- the user's authorial or communication style;
- concrete ways responses should now differ;
- anything that remains uncertain, time-sensitive or project-specific.

The test is intentionally practical: the migrated context should be **recognisable to the user**, not merely reported as stored.

## Workflow at a glance

```text
SOURCE AI TOOLS
     │
     │  copy extraction prompt
     ▼
1. EXTRACT
     │  save each output
     ▼
2. RECONCILE
     │  attach/paste outputs + reconciliation prompt
     │  save Master Portable Personal Harness
     ▼
3. INTEGRATE
     │  attach/paste Master Harness into ChatGPT Edu
     │  run integration prompt
     ▼
4. RECOGNISE
     │  start a new chat + run recognition prompt
     ▼
   DONE
```

## Privacy model

The site is deliberately a **local guide rather than a data collection service**.

- Personal harness content is not uploaded to this website.
- The app does not ask users to paste personal information into the page itself.
- Users copy prompts from the site and run them directly in their chosen AI systems.
- The site stores only workflow progress in the browser using local storage.
- Users are instructed not to migrate passwords, API keys, authentication tokens, financial identifiers or other secrets.
- Sensitive, temporary and project-specific information should remain outside global persistent context unless there is a clear reason to retain it.

Users remain responsible for deciding what material is appropriate to move into an institution-managed ChatGPT Edu workspace.

## Design principles

The workflow is based on several principles:

### Preserve the person, not the platform

The harness should describe the user, not reproduce the quirks or terminology of the AI system that generated it.

### Durable context over accumulated history

The goal is not to move every remembered fact. It is to preserve information that will continue to affect useful interaction across future conversations.

### Evidence before inference

Direct user statements and strongly repeated patterns should carry more weight than a one-off AI inference. Uncertain material should remain labelled as uncertain.

### Global context and project context are different

A user's broad professional identity, working preferences and communication style may be durable. A particular unit, policy, project, colleague, model version or hardware configuration usually is not.

### User control

The user remains the authority on their own profile. An AI-generated inference should never silently become a permanent fact simply because several systems repeated it.

### Recognition is the success criterion

A migration is successful when a fresh conversation behaves differently in ways the user can recognise and verify.

## App structure

The project is intentionally lightweight.

```text
ChatGPT-Edu-Migration/
├── index.html   # complete standalone application
└── README.md    # project documentation
```

The application is a single self-contained HTML file with its styles and JavaScript embedded. It has no build step, backend or database.

## Running locally

You can open `index.html` directly in a modern browser.

For a local HTTP server, for example:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Publishing with GitHub Pages

The site is designed to publish directly from the repository root.

In GitHub:

1. Open **Settings** for the repository.
2. Select **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch.
5. Select `/ (root)` as the folder.
6. Save.

GitHub Pages should then publish the repository's `index.html` at:

```text
https://staffordlumsden.github.io/ChatGPT-Edu-Migration/
```

Updates committed to `main` will be reflected in the Pages site after GitHub republishes it.

## The four built-in prompts

The application contains four prompts directly in `index.html`:

1. **Universal extraction prompt** — creates a portable harness from one source AI.
2. **Merge and reconciliation prompt** — combines multiple source harnesses into one Master Harness.
3. **ChatGPT Edu integration prompt** — asks ChatGPT to use the durable parts as persistent personal context where workspace settings permit.
4. **Recognition check** — tests the result in a clean conversation.

Each prompt can be copied directly from the interface or downloaded as Markdown.

## Intended audience

The workflow is designed for people who have accumulated useful context in one or more AI systems and are moving into a new ChatGPT environment, particularly an institution-managed **ChatGPT Edu** workspace.

It is intentionally suitable for users who do not want to work with exports, APIs, scripts or configuration files. The interaction model is simply:

**copy prompt → run it in the relevant AI → save or attach the output → move to the next step.**

## Current status

This repository contains the working standalone web app developed for the ChatGPT Edu migration workflow. The interface includes:

- a landing page explaining the purpose of the migration;
- a minimal workflow overview;
- direct navigation between all four stages;
- stage-specific colour coding;
- embedded prompts with copy and Markdown-download controls;
- a clean-room recognition check;
- local-only progress tracking;
- responsive layouts for desktop and smaller screens.

## Maintaining the project

When the workflow changes, preserve the distinction between:

- **workflow UI** — should remain simple and low-friction;
- **prompt detail** — can remain rigorous because users copy it rather than needing to read every line in the interface;
- **Master Harness content** — belongs to the user, not to this repository.

The first page and workflow overview should remain visually simple enough that a new user can understand the process before encountering the detailed prompts.

## Author and context

Created as part of work on portable personal AI context and migration into ChatGPT Edu at Sydney Law School.

The project explores a practical question: **how can useful personalisation move with the user without turning conversation history into a permanent, opaque profile?**
