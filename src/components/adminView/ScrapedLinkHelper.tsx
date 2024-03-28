export interface ScrapedLink {
    linkID?: string;
    expiration_date?: Date | string | number;
    hasMultiplePosts?: number;
    hasNextPage?: number;
    hasScrollForMore?: number;
    hasInfiniteScroll?: number;
    doesMorePostsUseClassName?: number;
    morePostsClassName?: string | null;
    currentPostsClassName?: string | null;
    currentPostsPrefixXpath?: string | null;
    currentPostsPostfixXpath?: string | null;
    link?: string;
    doesCurrentPostsUseClassName?: number;
    title?: string;
    postType?: string;
    morePostsXpath?: string | null;
    currentPostsStartIndex?: number;
  }