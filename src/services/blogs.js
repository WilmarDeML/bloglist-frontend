import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addAuthorizationHeader = () => {
  return {
    headers: { Authorization: token },
  }
}

const create = async (blog) => {
  const config = addAuthorizationHeader()
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async ({ id, blog }) => {
  const config = addAuthorizationHeader()
  const response = await axios.put(`${baseUrl}/${id}`, blog, config)
  return response.data
}

const remove = async (id) => {
  const config = addAuthorizationHeader()
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, remove, setToken }
