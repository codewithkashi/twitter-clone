import React from "react";
import { CommentItem } from "..";
interface CommentFeedProps {
  comments?: Record<string, any>[];
}
const CommentFeed = ({ comments }: CommentFeedProps) => {
  return comments?.map((e) => <CommentItem key={e.id} data={e} />);
};

export default CommentFeed;
