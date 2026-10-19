# Mahim Link Hub — GitHub Pages + Firebase Admin

## Included
- `index.html`, `style.css`, `app.js`: public website
- `admin.html`, `admin.js`: Firebase email/password admin dashboard
- `firebase-config.js`: public Firebase Web config (fill in full values)
- `firestore.rules.example`: example rules (replace admin UID before publishing)

## 1. Publish on GitHub Pages
1. Create a public GitHub repository named `mahim-link-hub`.
2. Extract this ZIP and upload all files to the repository root.
3. Open **Settings → Pages**.
4. Choose **Deploy from a branch**, branch `main`, folder `/(root)`, then Save.
5. Wait for the Pages URL, usually `https://YOUR-USERNAME.github.io/mahim-link-hub/`.

## 2. Set up private admin (required)
GitHub Pages alone cannot provide a private dashboard that writes shared settings. This project uses Firebase Authentication + Firestore:
1. Open Firebase Console for project `smart-digital-bd`.
2. In Project settings → Your apps, select/create a **Web app** and copy its complete Firebase web configuration.
3. Put the complete `apiKey` and `appId` into `firebase-config.js`. Other fields should match the Firebase app config.
4. Firebase Console → Authentication → Sign-in method → enable **Email/Password**.
5. Authentication → Users → Add user. Create your own email/password. Do not share this password.
6. Copy your own user's **UID** from Authentication → Users.
7. Firestore Database → Rules: paste `firestore.rules.example`, replacing `REPLACE_WITH_YOUR_FIREBASE_AUTH_UID` with your actual UID. Publish rules.
8. Upload/commit updated files to GitHub. Open `/admin.html` on your published site and log in using your Firebase account.
9. In the dashboard, set three sponsor URLs, social URLs and the Google Drive URL, then press Save. Public page reads the settings from Firestore.

Important: public settings are meant to be public links, so anyone can read them. Only your UID should have write permission. Never put a service-account key, GitHub token, or private secret in client-side files.

## Social link behavior
- For each social step, user must click the outgoing link. The page records that the link was opened in the current tab session and enables Continue after returning.
- This does **not** prove that the person actually followed/subscribed/joined. The platforms do not expose a universal public check for these actions to a static website. Genuine verification requires platform-specific approved capabilities and may not be available.
- The opening flag is a basic user-flow gate, not a security boundary; a user can bypass client-side checks.

## Advertising and file-sharing notes
The 15-second timers are only waiting timers. They do not verify ad views/clicks or generate income. Follow the ad provider's policies. Only share apps/files you own or have permission to distribute.
