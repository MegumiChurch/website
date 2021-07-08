import { initializeApp } from 'firebase/app'

try {
  initializeApp({
    apiKey: process.env.Db,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID
  })
} catch (e) {
  console.log(e)
}
