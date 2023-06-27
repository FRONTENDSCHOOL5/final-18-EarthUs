export const BASE_URL = "https://api.mandarin.weniv.co.kr";
export const NO_IMAGE = "https://api.mandarin.weniv.co.kr/1687488082591.png";
export const NO_PROFILE_IMAGE =
  "https://api.mandarin.weniv.co.kr/1687452193045.png";

/**
 * @Profile
 * const { account } = useParams();
 * const PROFILE_DETAIL = getProfileDetailPath(account);
 * const PROFILE_EDIT = getProfileEditPath(account);
 * const PROFILE_FOLLOWING = getFollowingPath(account);
 * const PROFILE_FOLLOWER = getFollowerPath(account);
 */
export const getProfileDetailPath = account => `/profile/${account}`;
export const getProfileEditPath = account => `/profile/${account}/edit`;
export const getFollowingPath = account => `/profile/${account}/following`;
export const getFollowerPath = account => `/profile/${account}/follower`;

/**
 * @Post
 * const { postId } = useParams();
 * const POST_DETAIL = getPostDetailPath(postId);
 * const POST_EDIT = getPostEditPath(postId);
 * const POST_REPORT = getPostReportPath(postId);
 */
export const POST_UPLOAD = `/post/upload`;
export const getPostDetailPath = postId => `/post/${postId}`;
export const getPostEditPath = postId => `/post/${postId}/edit`;
export const getPostReportPath = postId => `/post/${postId}/report`;

/**
 * @Product
 * const { postId } = useParams();
 * const PRODUCT_DETAIL = getProductDetailPath(account);
 * const PRODUCT_EDIT = getProductEditPath(productId);
 */
export const PRODUCT_UPLOAD = `/product/upload`;
export const getProductDetailPath = account => `/profile/${account}/product`;
export const getProductEditPath = productId => `/product/${productId}/edit`;

/**
 * @chat
 */
export const CHAT_LIST = `/chat`;
export const CHAT_ROOM = `/chat/room`;

/**
 * @Home
 */
export const ONBOARDING = `/onboarding`;
export const INTRO = `/intro`;
export const HOME = `/home`;
export const NEWS_LETTER = `/newsletter`;
export const SEARCH = `/search`;

export const SIGN_IN = `/signin`;
export const SIGN_UP = `/signup`;
