import Axios from 'axios'

const axios = Axios.create()

export type UpdateResult = {
  n: number;
  nModified: number;
  ok: number;
}

export type CheckInForm = {
  _id: string;
  lat: number;
  lng: number;
}

interface Document {
  _id: string;
}

export interface CheckInRecord extends Document {
  position: {
    _id: string;
    lat: number;
    lng: number;
  };
  tenantID: string;
  createdAt: Date;
  createdBy: string;
}

export type CheckInRecordFilter = {
  createAt?: {
    $gt?: string;
    $lt: string;
  };
  createdBy?: string | {
    $in: string[];
  };
  'position._id'?: string | {
    $in: string[];
  };
}

export type CreatePositionForm = {
  lat: number;
  lng: number;
}

export type CreateUserForm = {
  username: string;
  password: string;
}

export type JwtUser = {
  _id: string;
  username: string;
  email: string;
  roles: string[];
  tenantID: string;
  createdAt: string;
  createdBy: string;
  iat: number;
  exp: number;
}

export type LoginForm = {
  username: string;
  password: string;
}

export interface Position extends Document {
  lat: number;
  lng: number;
  tenantID: string;
  createdAt: Date;
  createdBy: string;
}

export type RegisterForm = {
  username: string;
  password: string;
  email: string;
}

export type SettingForm = {
  maximumCheckInDistance: number; // in meters
  maximumCheckInAccuracy: number; // in meters
  minimumDurationBetweenCheckIn: number; // In minutes
}

export type UpdatePositionForm = {
  lat?: number;
  lng?: number;
}

export type UpdateUserForm = {
  username: string;
  password: string;
  email: string;
  roles: string[];
}

export interface User extends Document {
  username: string;
  email?: string;
  roles: string[];
  tenantID: string;
  createdAt: Date;
  createdBy?: string;
}

/**
 * Create a new user with worker role
 *
 * post /check-in
 */
export function checkIn (checkInForm: CheckInForm) {
  return axios.post<CheckInRecord>('/check-in', checkInForm)
}

/**
 * Get check in records as array
 *
 * get /check-in-records
 */
export function getCheckInRecords (params: { filter: CheckInRecordFilter }) {
  return axios.get<CheckInRecord[]>('/check-in-records', { params })
}

/**
 * Get own check in records as array
 *
 * get /own/check-in-records
 */
export function getOwnCheckInRecords (params: { filter: CheckInRecordFilter }) {
  return axios.get<CheckInRecord[]>('/own/check-in-records', { params })
}

/**
 * Get a check in record by ID
 *
 * get /check-in-records/:id
 */
export function getCheckInRecordByID (id: string) {
  return axios.get<CheckInRecord>(`/check-in-records/${id}`)
}

/**
 * Login a user
 *
 * post /login
 */
export function login (loginForm: LoginForm) {
  return axios.post<{ success: true }>('/login', loginForm)
}

/**
 * Logout a user
 *
 * post /logout
 */
export function logout () {
  return axios.post<{ success: true }>('/logout')
}

/**
 * Create a new position
 *
 * post /positions
 */
export function createPosition (createPositionForm: CreatePositionForm) {
  return axios.post<Position>('/positions', createPositionForm)
}

/**
 * Get all positions as array
 *
 * get /positions
 */
export function getPositions () {
  return axios.get<Position[]>('/positions')
}

/**
 * Get a position by a ID
 *
 * get /positions/:id
 */
export function getPositionByID (id: string) {
  return axios.get<Position>(`/positions/${id}`)
}

/**
 * Update an position by ID
 *
 * put /positions/:id
 */
export function updatePositionByID (id: string, updatePositionForm: UpdatePositionForm) {
  return axios.put<UpdateResult>(`/positions/${id}`, updatePositionForm)
}

/**
 * Delete a position by ID
 *
 * delete /positions/:id
 */
export function deletePositionByID (id: string) {
  return axios.delete(`/positions/${id}`)
}

/**
 * Register a new user
 *
 * post /register
 */
export function register (registerForm: RegisterForm) {
  return axios.post<{ success: true }>('/register', registerForm)
}

/**
 * Get own setting in object
 *
 * get /setting
 */
export function getSetting () {
  return axios.get<SettingForm>('/setting')
}

/**
 * Update own setting
 *
 * put /setting
 */
export function updateSetting (settingForm: SettingForm) {
  return axios.put<SettingForm>('/setting', settingForm)
}

/**
 * Create a new user with worker role
 *
 * post /users
 */
export function createUser (createUserForm: CreateUserForm) {
  return axios.post<User>('/users', createUserForm)
}

/**
 * Get all users as array
 *
 * get /users
 */
export function getUsers () {
  return axios.get<User[]>('/users')
}

/**
 * Get a user by ID
 *
 * get /users/:id
 */
export function getUserByID (id: string) {
  return axios.get<User>(`/users/${id}`)
}

/**
 * Update an user by ID
 *
 * put /users/:id
 */
export function updateUserByID (id: string, updateUserForm: UpdateUserForm) {
  return axios.put<UpdateResult>(`/users/${id}`, updateUserForm)
}

/**
 * Delete a user by ID
 *
 * delete /users/:id
 */
export function deleteUserByID (id: string) {
  return axios.delete(`/users/${id}`)
}

/**
 * Get self info
 *
 * get /self-info
 */
export function getSelfInfo () {
  return axios.get('/self-info')
}
