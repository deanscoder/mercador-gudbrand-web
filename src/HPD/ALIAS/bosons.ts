import axios from "axios"

const bosons = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + '/api/v2',
})

export default bosons