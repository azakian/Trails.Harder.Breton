export function YouTubeEmbed({ url }: { url: string }) {
  const match = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  const id = match?.[1];
  if (!id) return <div className="muted">Lien YouTube invalide</div>;
  return (
    <iframe
      className="w-full"
      style={{
        aspectRatio: "16 / 9",
        border: 0,
        borderRadius: 8,
        width: "100%",
      }}
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
