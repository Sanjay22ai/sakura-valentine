export default function Overlay() {
    const openPlaylist = () => {
      // trigger petal burst
      window.dispatchEvent(new Event("petal-burst"));
  
      // open playlist
      window.open("https://open.spotify.com/", "_blank");
    };
  
    return (
      <div style={styles.container}>
        <div style={styles.bubble}>
          You're my favorite notification 🌸
        </div>
  
        <button style={styles.button} onClick={openPlaylist}>
          Open Playlist ♥
        </button>
      </div>
    );
  }
  
  const styles = {
    container: {
      position: "absolute",
      bottom: "40px",
      width: "100%",
      textAlign: "center"
    },
    bubble: {
      display: "inline-block",
      background: "rgba(255,255,255,0.9)",
      padding: "14px 24px",
      borderRadius: "20px",
      marginBottom: "14px",
      backdropFilter: "blur(6px)"
    },
    button: {
      background: "#ff8fab",
      color: "white",
      border: "none",
      padding: "12px 24px",
      borderRadius: "22px",
      cursor: "pointer",
      fontSize: "1rem"
    }
  };
  