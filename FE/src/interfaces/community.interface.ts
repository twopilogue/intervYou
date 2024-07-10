export interface CommunityConfig {
  communityId: number;
  title: string;
  content: string;
  nickname: string;
  commentCount: number;
  createTime: string;
  comments?: CommentConfig[];
}

export interface CommentConfig {
  commentId: number;
  isDelete: boolean;
  nickname: string;
  commentContent: string;
  createTime: Date;
  parentCommentId: number;
  depth: number;
}
