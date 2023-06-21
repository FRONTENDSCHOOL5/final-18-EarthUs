export const BASE_URL = "https://api.mandarin.weniv.co.kr";
export const NO_IMAGE = "https://api.mandarin.weniv.co.kr/1687097552358.png";

/**
 * @Profile
 * const { account } = useParams();
 * const PROFILE_DETAIL = getProfileDetailPath(account);
 * const PROFILE_UPLOAD = getProfileUploadPath(account);
 * const PROFILE_EDIT = getProfileEditPath(account);
 */
export const getProfileDetailPath = account => `/profile/${account}`;
export const getProfileUploadPath = account => `/profile/${account}/upload`;
export const getProfileEditPath = account => `/profile/${account}/edit`;

/**
 * @Post
 * const { postId } = useParams();
 * const POST_EDIT = getPostEditPath(postId);
 */
export const POST_UPLOAD = `/post/upload`;
export const getPostEditPath = postId => `/post/${postId}/edit`;
