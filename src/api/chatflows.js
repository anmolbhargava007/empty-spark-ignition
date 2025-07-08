import client, { apiClientNodeJs } from './client'

const getAllChatflows = () => client.get('/chatflows?type=CHATFLOW')

const getAllAgentflows = () => client.get('/chatflows?type=MULTIAGENT')

const getSpecificChatflow = (id) => client.get(`/chatflows/${id}`)

const getSpecificChatflowFromPublicEndpoint = (id) => client.get(`/public-chatflows/${id}`)

const createNewChatflow = (body) => client.post(`/chatflows`, body)

const importChatflows = (body) => client.post(`/chatflows/importchatflows`, body)

const updateChatflow = (id, body) => client.put(`/chatflows/${id}`, body)

const deleteChatflow = (id) => client.delete(`/chatflows/${id}`)

const getIsChatflowStreaming = (id) => client.get(`/chatflows-streaming/${id}`)

const getAllowChatflowUploads = (id) => client.get(`/chatflows-uploads/${id}`)

// CUD for storing Agent data in local DB ->

const saveDataInOurDb = (body) => apiClientNodeJs.post(`/agents`, body)

const updateDataInOurDb = (body) => apiClientNodeJs.put(`/agents`, body)

const deletAgentFromLocalDb = (body) => apiClientNodeJs.delete('/agents', { data: body })

export default {
    getAllChatflows,
    getAllAgentflows,
    getSpecificChatflow,
    getSpecificChatflowFromPublicEndpoint,
    createNewChatflow,
    saveDataInOurDb,
    updateDataInOurDb,
    importChatflows,
    updateChatflow,
    deleteChatflow,
    deletAgentFromLocalDb,
    getIsChatflowStreaming,
    getAllowChatflowUploads
}
