interface AudioPlayerProps {
  url: string;
}

export function AudioPlayer({ url }: AudioPlayerProps) {
  return (
    <audio controls>
      <source src={url} type="audio/mpeg" />
    </audio>
  );
}
