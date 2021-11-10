import { Bill } from "react-app-env";

const BASE_URL = "localhost:8000/bills"

export const getBills = async (username: string): Promise<Bill[]> =>
    fetch(`${BASE_URL}/${username}`).then((res) => res.json())