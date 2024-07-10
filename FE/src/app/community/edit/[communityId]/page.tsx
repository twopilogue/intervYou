import axios from "axios";
import CommunityCreate from "../../create/CommunityCreate";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function CommunityEdit({ params }: { params: { communityId: number } }) {
  const res = await axios.get(`${BASE_URL}/api/communities/${params.communityId}`);
  const { title, content } = res.data.data;

  return <CommunityCreate editTitle={title} editContent={content} communityId={params.communityId} />;
}
