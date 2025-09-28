// API configuration utility
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    contact: `${API_BASE_URL}/api/contact`,
    health: `${API_BASE_URL}/api/health`,
    testEmail: `${API_BASE_URL}/api/test-email`,
  },
  headers: {
    'Content-Type': 'application/json',
  },
}

// Helper function to make API calls
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }

  const response = await fetch(url, { ...defaultOptions, ...options })
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}

// Specific API functions
export const contactAPI = {
  sendMessage: async (data: {
    name: string
    email: string
    subject: string
    message: string
  }) => {
    return apiCall(apiConfig.endpoints.contact, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  
  checkHealth: async () => {
    return apiCall(apiConfig.endpoints.health)
  },
  
  testEmail: async () => {
    return apiCall(apiConfig.endpoints.testEmail, {
      method: 'POST',
    })
  },
}
