export default function Page(props) {
  const { video } = props;
  return <video controls width="728" id="player" src={video}></video>;
}
