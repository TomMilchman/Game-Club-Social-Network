import { useParams } from "react-router-dom";

export default function UserPage() {
  const { username } = useParams();

  return <p>This is user {username}'s page</p>;
}
