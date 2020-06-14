import { JwtUser } from 'src/services/geoCheckIn'

export interface SelfInfoStateInterface {
  value: JwtUser | null;
}

const state: SelfInfoStateInterface = {
  value: null
}

export default state
