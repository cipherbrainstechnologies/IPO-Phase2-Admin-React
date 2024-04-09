import { combineReducers } from "redux";
import chatSlice from "../slice/chatSlice";
import imagePreviewSlice from "../slice/imagePreviewSlice";
import mainLineIpoSlices from "../slice/mainLineIpoSlices";
import newsSlice from "../slice/newsSlice";
import offersSlice from "../slice/offersSlice";
import sidebarToggleSlice from "../slice/sidebarToggleSlice";
import privacyPolicySlice from "../slice/privacyPolicySlice";
import faqsSlice from "../slice/faqsSlice";
import ipoAllotSlice from "../slice/ipoAllotSlice";
import termsAndConditionsSlice from "../slice/termsAndConditionsSlice";
import contactUsSlice from "../slice/contactUsSlice";
import popcardsSlice from "../slice/popcardsSlice";
import versionSlice from "../slice/versionSlice";
import bannersSlice from "../slice/bannersSlice";
import usersSlice from "../slice/usersSlice";
import modalSlice from "../slice/modalSlice";
import notificationsSlice from "../slice/notificationsSlice";
import paginationSlice from "../slice/paginationSlice";
const reducer = combineReducers({
  //slice
  mainLineIpoSlice: mainLineIpoSlices,
  toggleReducer: sidebarToggleSlice,
  chatReducer: chatSlice,
  newsReducer: newsSlice,
  imagePreviewReducer: imagePreviewSlice,
  offersReducer: offersSlice,
  bannersReducer: bannersSlice,
  privacyPolicyReducer: privacyPolicySlice,
  faqsReducer: faqsSlice,
  ipoAllotReducer: ipoAllotSlice,
  termsConditionsReducer: termsAndConditionsSlice,
  contactUsReducer: contactUsSlice,
  userReducer: usersSlice,
  modalReducer: modalSlice,
  notificationReducer: notificationsSlice,
  paginationReducer: paginationSlice,
  popcardsReducer: popcardsSlice,
  versionReducer :versionSlice
});
export default reducer;
