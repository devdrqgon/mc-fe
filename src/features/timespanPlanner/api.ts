import { TimespanPlan } from "react-app-env";

export const BASE_URL = "http://localhost:8000/plans";

export const CreatePlan = async (plan: TimespanPlan): Promise<TimespanPlan> =>
  fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plan,
    }),
  }).then((res) => res.json());