export const BASE_URL = "https://api.mandarin.weniv.co.kr";
export const NO_IMAGE = "https://api.mandarin.weniv.co.kr/1687097552358.png";

/**
 * @Profile
 * const { account } = useParams();
 * const PROFILE_DETAIL = getProfileDetailPath(account);
 * const PROFILE_UPLOAD = getProfileUploadPath(account);
 * const PROFILE_EDIT = getProfileEditPath(account);
 * const PROFILE_FOLLOWING = getFollowingPath(account);
 * const PROFILE_FOLLOWER = getFollowerPath(account);
 */
export const getProfileDetailPath = account => `/profile/${account}`;
export const getProfileUploadPath = account => `/profile/${account}/upload`;
export const getProfileEditPath = account => `/profile/${account}/edit`;
export const getFollowingPath = account => `/profile/${account}/following`;
export const getFollowerPath = account => `/profile/${account}/follower`;

/**
 * @Post
 * const { postId } = useParams();
 * const POST_EDIT = getPostEditPath(postId);
 */
export const POST_UPLOAD = `/post/upload`;
export const getPostEditPath = postId => `/post/${postId}/edit`;

/**
 * @Product
 * const { postId } = useParams();
 * const PRODUCT_DETAIL = getProductDetailPath(account);
 * const PRODUCT_EDIT = getProductEditPath(productId);
 */
export const PRODUCT_UPLOAD = `/product/upload`;
export const getProductDetailPath = account => `/product/${account}`;
export const getProductEditPath = productId => `/product/${productId}/edit`;

/**
 * @chat
 */
export const CHAT_LIST = `/chat`;
export const CHAT_ROOM = `/chat/room`;

export const ONBOARDING = `/onboarding`;
export const HOME = `/home`;
