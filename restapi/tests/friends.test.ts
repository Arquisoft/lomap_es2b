import express from 'express'

import app from '../src/app'
import { connect, clearAndClose } from './helpers/db'

/**
 * Starts the server connecting to a test DB
 */
beforeAll(() => {
    connect()
})

describe('friends', () => {

    /**
     * When 
     */
    test('User adds new friend', () => {

    })

})

afterAll(() => {
    clearAndClose()
})
