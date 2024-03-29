import request from 'supertest'
import { join } from 'path'

import app from '../src/app'
import { existsSync, readdir, unlink } from 'fs'
import { imgUploadPath } from '../src/constants'

const assetsPath = join(__dirname, 'testAssets')

describe('POST /api/image/upload', () => {

  const supertest = request(app)

  it('tries to upload an empty image', async () => {
    const response = await supertest.post('/api/image/upload')
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ success: false, error: { message: 'Image missing' } })
  })
  
  it('tries to upload an image', () => {
    const filepath = join(assetsPath, 'image.jpeg')
    if (!existsSync(filepath))
      fail('Test file missing')

    return supertest.post('/api/image/upload').attach('image', filepath).then(response => {
      expect(response.body.success).toEqual(true)
    }).catch(err => {
      throw err
    })
    
  })

  afterEach(() => {
    if (existsSync(imgUploadPath))
      readdir(imgUploadPath, (err, files) => {
        if (err) throw err;
      
        for (const file of files) {
          unlink(join(imgUploadPath, file), (err) => {
            if (err) throw err;
          });
        }
      });
  })

})

describe('GET /api/image/get/:id', () => { 

  const supertest = request(app)

  it('tries to get a non existing image', async () => {
    const response = await supertest.get('/api/image/get/not_found')
    expect(response.status).toBe(404)
    expect(response.body).toEqual({ success: false, error: { message: 'Not Found' } })
  })
  
  it('uploads an image and tries to get it back', async () => {
    const filepath = join(assetsPath, 'image.jpeg')

    const imgName: string = (await supertest.post('/api/image/upload').attach('image', filepath)).body.data.filename

    const response = await supertest.get(`/api/image/get/${imgName}`)
    expect(response.status).toBe(200)
    // Se deberia comprobar que se devuelve la imagen correcta pero no se como (esta en response.text)
  })

  afterEach(() => {
    if (existsSync(imgUploadPath))
      readdir(imgUploadPath, (err, files) => {
        if (err) throw err;
      
        for (const file of files) {
          unlink(join(imgUploadPath, file), (err) => {
            if (err) throw err;
          });
        }
      });
  })

})