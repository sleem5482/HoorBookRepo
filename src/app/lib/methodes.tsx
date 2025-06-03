import { type ApiResponse } from "./type";
import { CallApi } from "./api-call";

export const fetchData = async <T = unknown>(APIURL: string): Promise<T> => {
  try {
    const res: ApiResponse<T> = await CallApi("get", `${APIURL}`);
    
    if (!res.succeeded) {
      throw new Error(res.message || "Failed to fetch data");
    }

    return res.data;
  } catch (error) {
    console.error(`API fetch error (${APIURL}):`, error);
    throw new Error(`Failed to fetch ${APIURL} data`);
  }
};

export const fetchDataarray = async <T = unknown>(APIURL: string): Promise<T | null> => {
  try {
    const res: ApiResponse<T> = await CallApi("get", APIURL);
    
    if (!res.succeeded || !res.data) {
      throw new Error(res.message || "No data found");
    }

    if (Array.isArray(res.data) && res.data.length > 0) {
      return res.data ?? null;
    } else if (!Array.isArray(res.data)) {
      return res.data;
    }
    
    return null;
  } catch (error) {
    console.error(`API fetch error (${APIURL}):`, error);
    return null;
  }
};

export const Postresponse = async <T = unknown, R = unknown>(APIURL: string, data: T): Promise<R> => {
  try {
    const res: R = await CallApi("post", `${APIURL}`, data);
    if (!res) {
      throw new Error("Failed to Post data");
    }
    return res;
  } catch (error) {
    console.error(`API Post error (${APIURL}):`, error);
    throw new Error(`Failed to Post ${APIURL} data`);
  }
};

export const PutResponse = async <T = unknown, R = unknown>(APIURL: string, data: T): Promise<R> => {
  try {
    const res: R = await CallApi("put", `${APIURL}`, data);
    if (!res) {
      throw new Error("Failed to update data");
    }
    return res;
  } catch (error) {
    console.error(`API PUT error (${APIURL}):`, error);
    throw new Error(`Failed to update ${APIURL} data`);
  }
};

export const DeleteResponse = async <R = unknown>(APIURL: string): Promise<R> => {
  try {
    const res: R = await CallApi("delete", `${APIURL}`);
    if (!res) {
      throw new Error("Failed to delete data");
    }
    return res;
  } catch (error) {
    console.error(`API DELETE error (${APIURL}):`, error);
    throw new Error(`Failed to delete ${APIURL} data`);
  }
};