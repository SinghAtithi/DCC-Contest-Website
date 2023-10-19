import { BASE_URL } from "./constants";

const getDay=async()=>
{
    const day=await fetch(`${BASE_URL}/21days/day`);
    return day;
}
export default getDay;