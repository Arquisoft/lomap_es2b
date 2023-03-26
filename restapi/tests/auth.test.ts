import express from 'express'
import request from 'supertest'

import app from '../src/app'
import { connect, clearAndClose } from './helpers/db'

/**
 * Starts the server connecting to a test DB
 */
beforeAll(() => {
  connect()
})

describe('POST /api/login', () => {

  test('User logs in with a new WebId', async () => {
    const webId = 'https://user1.inrupt.com'
    const response = await request(app).post('/api/login').send({ WebId: webId })
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.data.token).toBeDefined()
    expect(response.body.data.webId).toBe(webId)
    expect(response.body.data.newUser).toBe(true)
  })

  test('User logs in with a stored WebId', async () => {
    const webId = 'https://user1.inrupt.com'
    const response = await request(app).post('/api/login').send({ WebId: webId })
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.data.token).toBeDefined()
    expect(response.body.data.webId).toEqual(webId)
    expect(response.body.data.newUser).toBe(false)
  })

  test('User logs in without sending WebId', async () => {
    const response = await request(app).post('/api/login')
    expect(response.statusCode).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.error.message).toEqual('User\'s WebId missing in request body')
  })

})

afterAll(() => {
  clearAndClose()
})