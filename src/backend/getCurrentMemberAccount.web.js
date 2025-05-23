import { members } from "wix-members.v2";
import { webMethod, Permissions } from "wix-web-module";

/* Sample options value:
 * {
 *  fieldsets: [ 'FULL' ]
 * }
 */

export const myGetCurrentMemberFunction = webMethod(
  Permissions.Anyone,
  async () => {
    try {
      const member = await members.getCurrentMember();
      console.log("Retrieved currently logged in member:", member);

      return member;
    } catch (error) {
      console.error(error);
      throw new Error("error");
    }
  },
);

/* Promise resolves to:
 *
 *  {
 *  "_createdDate": "2024-02-22T13:52:00.000Z",
 *  "_id": "7d368843-6f0c-4037-8d0e-b7e36a8a0c32",
 *   "_updatedDate": "2024-02-22T13:52:00.674Z",
 *  "activityStatus": "UNKNOWN",
 *   "contactId": "ff20c02e-3d13-4412-9529-d628aa0abc12",
 *   "privacyStatus": "UNKNOWN",
 *   "profile": {
 *     "nickname": "Maverick",
 *     "slug": "maverick123",
 *     "photo": {
 *       "url": "https://example.com/photo.jpg",
 *       "height": 0,
 *       "width": 0,
 *       "_id": ""
 *     }
 *   },
 *   "status": "UNKNOWN"
 * }
 *
 */


/*
 * Promise resolves to:
 *
 * {
 *     "account": {
 *         "_createdDate": "2024-06-06T12:46:55.496Z",
 *         "_id": "d0dc5ba3-4a10-4cfc-b304-c976d8ac7303",
 *         "_updatedDate": "2024-06-10T15:27:33.039Z",
 *         "contact": {
 *             "name": "Elena Rodriguez",
 *             "picture": {
 *                 "url": "https://lh3.googleusercontent.com/a/ACg8ocIYi6J3Jd-V88AyFM27n-LU_-WZmmZy04kU_UfYODaSDwipBgQ%3Ds96-c",
 *                 "height": 0,
 *                 "width": 0,
 *                 "_id": ""
 *             },
 *             "email": "elena.rodriguez@example.com",
 *             "displayName": "Elena Rodriguez",
 *             "_id": "6ef3fe0f-9e33-42d3-8abe-61d5560338b2"
 *         },
 *         "contactId": "6ef3fe0f-9e33-42d3-8abe-61d5560338b2",
 *         "lastActivityDate": "2024-06-10T15:27:30.954Z",
 *         "memberId": "7d368843-6f0c-4037-8d0e-b7e36a8a0c32",
 *         "points": {
 *             "balance": 50,
 *             "earned": 0,
 *             "adjusted": 70,
 *             "redeemed": 20,
 *             "expired": 0
 *         },
 *         "pointsExpiration": {
 *             "expirationDate": "2024-09-10T15:27:31.268Z",
 *             "expiringPointsAmount": 50
 *         },
 *         "revision": "21",
 *         "rewardAvailable": true,
 *         "tier": {
 *             "points": 70,
 *             "_updatedDate": "2024-06-10T15:27:31.041Z"
 *         }
 *     }
 * }
 */
