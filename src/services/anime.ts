import api from "./api";

export const search = async (query: string) => {
  try {
    const {data} = await api.post("/anime", {
      query,
      "simplified_version": true
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 5000 
    });
    
    return data;
  } catch (err) {
    return [];
  }
};
