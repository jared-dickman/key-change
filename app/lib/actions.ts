'use server'

import {AuthProvider, signIn} from '@/../auth'
import {Pages} from '@/constants/Pages'
import {createSong, fetchFilteredRepertoire, fetchSongById, updateSong} from '@/lib/data/songs/actions'
import {QueryResult, QueryResultRow, sql} from '@vercel/postgres'
import type {User} from 'next-auth'
import {AuthError} from 'next-auth'

export {createSong, updateSong, fetchSongById, fetchFilteredRepertoire}

export async function authenticateGoogle() {
  try {
    await signIn('google', { callbackUrl: `http://localhost:3000/${Pages.Studio}` })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}

export async function checkUserExists(user: User): Promise<boolean> {
  const email = user.email
  let result = await sql`SELECT EXISTS ( SELECT 1 FROM users WHERE email = ${email} ) AS user_exists;`
  return result.rows[0].user_exists
}

export async function createUser(user: User): Promise<QueryResult<QueryResultRow>> {
  const id = crypto.randomUUID()
  const password = crypto.randomUUID()
  const provider = 'Google'
  return await sql`INSERT INTO users (Id, Name, Email, Password, Provider) VALUES (${id}, ${user.name}, ${user.email}, ${password}, ${provider});`
}

export async function getUserByProvider(user: Omit<User, 'id'>, provider: AuthProvider): Promise<User> {
  const result = await sql`SELECT id, name, email, provider FROM users WHERE provider = ${provider} and email = ${user.email}`
  return result.rows[0]
}
