/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'
import { USER_ROLE } from './userContants'

export interface TUser {
  id: string
  password: string
  needsPasswordChange: boolean
  passwordChangedAt?: Date
  role: 'admin' | 'student' | 'faculty'
  status: 'in-progress' | 'block'
  isDeleted: boolean
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean
}
export type TUserRole = keyof typeof USER_ROLE
