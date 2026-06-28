import { giftConfig } from "../giftConfig";

export default function Overlay() {
  const openPlaylist = () => {
    window.dispatchEvent(new Event("petal-burst"));
    window.open(giftConfig.playlistUrl, "_blank");
  };

  const title =
    giftConfig.name.toLowerCase() === "you"
      ? giftConfig.headline
      : `${giftConfig.headline}, ${giftConfig.name}`;

  return (
    <div style={styles.container}>
      <div style={styles.panel}>
        <p style={styles.eyebrow}>made with love</p>

        <div style={styles.bubble}>
          <h1 style={styles.title}>{title}</h1>
          <p style={styles.message}>{giftConfig.message}</p>
        </div>

        <button type="button" style={styles.button} onClick={openPlaylist}>
          {giftConfig.playlistLabel} ♥
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "absolute",
    right: "16px",
    bottom: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    pointerEvents: "none",
    fontFamily: '"Segoe UI", system-ui, sans-serif',
    zIndex: 10,
  },
  panel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: "8px",
    width: "min(72vw, 240px)",
    pointerEvents: "none",
  },
  eyebrow: {
    margin: "0 0 4px",
    width: "100%",
    textAlign: "center",
    fontSize: "0.58rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "rgba(255, 240, 248, 0.75)",
    textShadow: "0 1px 6px rgba(40, 20, 50, 0.5)",
  },
  bubble: {
    width: "100%",
    boxSizing: "border-box",
    background: "rgba(255, 248, 252, 0.78)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    padding: "10px 12px",
    borderRadius: "12px",
    boxShadow: "0 4px 18px rgba(40, 20, 40, 0.18)",
    border: "1px solid rgba(255, 192, 210, 0.45)",
    pointerEvents: "auto",
  },
  title: {
    margin: "0 0 4px",
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#6b3a55",
    lineHeight: 1.2,
  },
  message: {
    margin: 0,
    fontSize: "0.72rem",
    lineHeight: 1.4,
    color: "#7a5068",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    pointerEvents: "auto",
    background: "linear-gradient(135deg, rgba(255, 158, 187, 0.92) 0%, rgba(255, 122, 162, 0.92) 100%)",
    color: "white",
    border: "none",
    padding: "7px 12px",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.01em",
    textAlign: "center",
    lineHeight: 1.25,
    boxShadow: "0 3px 12px rgba(255, 100, 140, 0.28)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
};