import axios from 'axios'

export const API_BASE =
  import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8000/api'

export const apiClient = axios.create({
  baseURL: API_BASE,
})

export const endpoints = {
  login: '/customers/login/',
  customers: '/customers/',
  cakes: '/cakes/',
  customizations: '/customizations/',
  cart: '/cart/',
  orders: '/orders/',
  deliveryTrack: '/delivery_track/',
}
