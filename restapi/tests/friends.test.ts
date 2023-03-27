import request from 'supertest'

import app from '../src/app'
import { connect, clearAndClose, addMockData } from './helpers/db'

/**
 * Starts the server connecting to a test DB
 */
beforeAll( async () => {
	await connect()
	await addMockData()
})

describe('GET /api/friends/all', () => {

	test('Get friends from logged user who has no friends (user1)', async () => {
		// User logs in and gets access token
		const token = (await request(app).post('/api/login').send({ WebId: 'https://user1.inrupt.com' })).body.data.token
		if (!token)
			fail('Auth token missing')

    const response = await request(app).get('/api/friends/all').set({
      'Accept': 'application/json',
      'Session-Token': token,
    })

    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.data.friends).toBeInstanceOf(Array)
    expect(response.body.data.friends.length).toBe(0)
	})

  test('Get friends from logged user who has one friend (user2)', async () => {
		// User logs in and gets access token
		const token = (await request(app).post('/api/login').send({ WebId: 'https://user2.inrupt.com' })).body.data.token
		if (!token)
			fail('Auth token missing')

    const response = await request(app).get('/api/friends/all').set({
      'Accept': 'application/json',
      'Session-Token': token,
    })

    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.data.friends).toBeInstanceOf(Array)
    expect(response.body.data.friends.length).toBe(1)
	})

  test('Get friends from logged user who has several friends (user3)', async () => {
		// User logs in and gets access token
		const token = (await request(app).post('/api/login').send({ WebId: 'https://user3.inrupt.com' })).body.data.token
		if (!token)
			fail('Auth token missing')

    const response = await request(app).get('/api/friends/all').set({
      'Accept': 'application/json',
      'Session-Token': token,
    })

    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.data.friends).toBeInstanceOf(Array)
    expect(response.body.data.friends.length).toBe(2)
	})

  test('Try to get friends without auth token', async () => {
    const response = await request(app).get('/api/friends/all').set({
      'Accept': 'application/json',
    })

    expect(response.statusCode).toBe(403)
    expect(response.body.error.message).toBe('User\'s Session-Token missing in request headers')
	})
  
  test('Try to get friends with bad auth token', async () => {
    const response = await request(app).get('/api/friends/all').set({
      'Accept': 'application/json',
      'Session-Token': 'asdasdasfjnasodansodinaofnsrobnew',
    })

    expect(response.statusCode).toBe(403)
    expect(response.body.error.message).toBe('Could not authenticate user')
	})

})

describe('POST /api/friends/new', () => {

	test('User (user2) becomes friend of user with no friends (user1)', async () => {
		// User logs in and gets access token
		const token = (await request(app).post('/api/login').send({ WebId: 'https://user2.inrupt.com' })).body.data.token
		if (!token)
			fail('Auth token missing')

    const response = await request(app).post('/api/friends/new').set({
      'Accept': 'application/json',
      'Session-Token': token,
    }).send({
      friendWebId: 'https://user1.inrupt.com'
    })

    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.data.message).toEqual('Added new friend')
	})
  
  test('Try to add friends without sending friend\'s WebId', async () => {
    const token = (await request(app).post('/api/login').send({ WebId: 'https://user2.inrupt.com' })).body.data.token
		if (!token)
			fail('Auth token missing')

    const response = await request(app).post('/api/friends/new').set({
      'Accept': 'application/json',
      'Session-Token': token,
    })

    expect(response.statusCode).toBe(400)
    expect(response.body.error.message).toBe('Friend\'s WebId missing on request body')
	})

  test('User tries to add themself as friend', async () => {
    const token = (await request(app).post('/api/login').send({ WebId: 'https://user2.inrupt.com' })).body.data.token
		if (!token)
			fail('Auth token missing')

    const response = await request(app).post('/api/friends/new').set({
      'Accept': 'application/json',
      'Session-Token': token,
    }).send({
      friendWebId: 'https://user2.inrupt.com'
    })

    expect(response.statusCode).toBe(400)
    expect(response.body.error.message).toBe('Cannot add yourself as friend')
	})

  test('Try to add friend who is not a LoMap user', async () => {
    const token = (await request(app).post('/api/login').send({ WebId: 'https://user2.inrupt.com' })).body.data.token
		if (!token)
			fail('Auth token missing')

    const response = await request(app).post('/api/friends/new').set({
      'Accept': 'application/json',
      'Session-Token': token,
    }).send({
      friendWebId: 'https://noUser.inrupt.com'
    })

    expect(response.statusCode).toBe(400)
    expect(response.body.error.message).toBe('Friend is not a LoMap user')
	})

  test('Try to add friend who is already a friend', async () => {
    const token = (await request(app).post('/api/login').send({ WebId: 'https://user2.inrupt.com' })).body.data.token
		if (!token)
			fail('Auth token missing')

    const response = await request(app).post('/api/friends/new').set({
      'Accept': 'application/json',
      'Session-Token': token,
    }).send({
      friendWebId: 'https://user1.inrupt.com'
    })

    expect(response.statusCode).toBe(200)
    expect(response.body.data.message).toBe('Already friends')
	})

})

afterAll( async () => {
	await clearAndClose()
})
