import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>HerHelp API</h1>
        <p>
          Backend for the HerHelp mobile app. Use these endpoints from Expo after
          connecting MongoDB Atlas.
        </p>
        <ul>
          <li>GET /api/health</li>
          <li>POST /api/auth/register</li>
          <li>POST /api/auth/login</li>
          <li>GET /api/auth/me</li>
        </ul>
      </main>
    </div>
  );
}
