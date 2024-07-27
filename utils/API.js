import * as API_ENDPOINTS from "../constants/API_ENDPOINTS";
import { AXIOS_CLIENT } from "@/utils/AXIOS_CLIENT";

const makeRequest = async (endpoint, data, method = "post") => {
  try {
    let response = await AXIOS_CLIENT[method](endpoint, data);
console.log(response);
    let result = await response?.data;

    if (result) {
      console.warn(`--=${endpoint}===`, result);
      return result;
    }
  } catch (error) {
    console.log(endpoint.toUpperCase() + ": ", error.message);
    throw new Error(`${endpoint}: ${error.message}`);
  }
};

//AUTH APIs

export const GET_USER_HIERACHY_API = () =>
  makeRequest(API_ENDPOINTS.USER_HIERACHY, null, "get");

export const GET_CANDIDATE_STATUS_API = () =>
  makeRequest(API_ENDPOINTS.CANDIDATE_STATUS_ENDPOINT, null, "get");

export const GET_INTERVIEW_AND_HIRED_DETAILS_API = () =>
  makeRequest(API_ENDPOINTS.INTERVIEW_AND_HIRED_DETAILS_ENDPOINT, null, "get");

export const GET_POSTED_JOB_LISTS_API = () =>
  makeRequest(
    API_ENDPOINTS.POST_JOB_LIST_ENDPOINT,
    {
      status: "InActive",
    },
    "get"
  );

export const GET_POSTED_JOB_Active_LISTS_API = () =>
  makeRequest(
    API_ENDPOINTS.POST_JOB_Active_LIST_ENDPOINT,
    {
      status: "Active",
    },
    "get"
  );

export const GET_TODAY_MEETING_DETAILS_API = () =>
  makeRequest(API_ENDPOINTS.TODAY_MEETING_DETAILS_ENDPOINT, null, "get");

export const GET_ACTIVITIES_API = () =>
  makeRequest(API_ENDPOINTS.ACTIVITIES_ENDPOINT, {
    // from_date: "2024-03-20",
    // to_date: "2024-03-24",
  });

export const GET_UPCOMINGS_API = () =>
  makeRequest(API_ENDPOINTS.UPCOMINGS_ENDPOINT, {
    // from_date: "2024-03-20",
    // to_date: "2024-03-24",
  });

export const GET_HIRED_API = () =>
  makeRequest(API_ENDPOINTS.HIRED_ENDPOINT, {
    from_date: "2024-03-20",
    to_date: "2024-03-24",
  });

export const GET_TICKET_LIST_API = () => {
  makeRequest(API_ENDPOINTS.TICKET_LIST_ENDPOINT, null, "get");
};

export const GET_SETTINGS_API = () => {
  makeRequest(API_ENDPOINTS.SETTINGS_ENDPOINT, null, "get");
};

export const GET_GENERAL_SETTINGS_API = (id) => {
  makeRequest(API_ENDPOINTS.SETTINGS_GENERAL_ENDPOINT + id + "/", null, "get");
};

export const GET_SETTINGS_ACCOUNT_API = () => {
  makeRequest(API_ENDPOINTS.SETTINGS_ACCOUNT_ENDPOINT, null, "get");
};

export const GET_SETTINGS_MANAGE_ACCOUNT_API = (id) => {
  makeRequest(API_ENDPOINTS.SETTINGS_MANAGE_ACCOUNT_ENDPOINT, null, "get");
};

export const GET_CANDIDATE_DETAILS_API = ({ candidate_id, job_id }) => {
  makeRequest(
    API_ENDPOINTS.CANDIDATE_DETAILS_ENDPOINT,
    {
      candidate_id: 2,
      job_id: 1,
    },
    null,
    "get"
  );
};

export const LOGIN_API = (data) =>
  makeRequest(API_ENDPOINTS.LOGIN_ENDPOINT, data);

export const LOGOUT_API = ({ data }) =>
  makeRequest(API_ENDPOINTS.LOGOUT_ENDPOINT, data);

export const USER_ACCOUNT_MANAGEMENT_ACCOUNT_API = () =>
  makeRequest(API_ENDPOINTS.USER_ACCOUNT_MANAGEMENT_ACCOUNT, null, "get");

