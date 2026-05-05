# Frontend ↔ Backend Connection Tasks

## Phase 1 — API Layer
- [x] ~~Create base API client `frontend/src/api/client.js` (JWT storage, token refresh, base `request()`)~~
- [x] ~~Create auth module `frontend/src/api/auth.js` (register, login, onboarding, facebook, logout)~~
- [x] ~~Create dashboard module `frontend/src/api/dashboard.js` (fetch + data transformers for profile, products, conversations, activity)~~
- [x] ~~Configure Vite dev proxy — `/api/*` → `http://localhost:8000` in `vite.config.js`~~
- [x] ~~Handle Facebook OAuth callback in `App.jsx` (read `?access=&refresh=&page=` from URL, save tokens, redirect)~~

---

## Phase 2 — Auth Pages

### SignUpPage.jsx
- [x] ~~Wire email/password register form → `POST /api/auth/register/`~~
- [x] ~~Wire Facebook button → `GET /api/auth/facebook/` then redirect to returned `auth_url`~~
- [x] ~~Wire onboarding form → `POST /api/auth/onboarding/` then navigate to dashboard~~

### SignInPage.jsx
- [x] ~~Wire email/password login form → `POST /api/auth/login/`~~
- [x] ~~Wire Facebook button → `GET /api/auth/facebook/` then redirect to returned `auth_url`~~

---

## Phase 3 — Dashboard Page

### Data fetching
- [x] ~~Add `DashboardContext` to `DashboardPage.jsx` to share fetched data with all sub-components~~
- [x] ~~Fetch real profile data on load → replace `CLIENT` mock~~
- [x] ~~Fetch real products on load → replace `MOCK_PRODUCTS`~~
- [x] ~~Fetch real conversations on load → replace `MOCK_CONVOS`~~
- [x] ~~Fetch real activity on load → replace `MOCK_ACTIVITY`~~

### Product actions
- [x] ~~Wire "Add Product" modal → `POST /api/products/`~~
- [x] ~~Wire delete button → `DELETE /api/products/{id}/`~~
- [x] ~~Wire Pause/Activate toggle → `PATCH /api/products/{id}/status/`~~
- [x] ~~Wire "Generate with AI" button → `POST /api/products/{id}/generate-description/`~~

### Other
- [x] ~~Wire logout button in Sidebar → `POST /api/auth/logout/` then redirect to home~~

---

## Phase 4 — External Setup (manual actions required)

- [ ] Set `GEMINI_API_KEY` in `backend/.env` (needed for AI product description generation)
- [ ] Create n8n workflow that receives webhook payload → calls AI → replies via Messenger API
- [ ] Set the n8n webhook URL on Group Alpha (via Django admin at `http://localhost:8000/admin/`)
- [ ] Register Facebook App webhook in Meta Developer Console → point to `https://yourdomain.com/api/webhooks/facebook/`
- [ ] Set verify token in Meta console to match `FB_WEBHOOK_VERIFY_TOKEN` in `.env`
