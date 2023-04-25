import { Suspense } from 'react';
import i18n from 'i18next'
import { render } from '@testing-library/react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import Map from '.'
import { Category } from '../../types/Category';
import Loader from '../Loader';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
})



describe('Map component', () => {

  const clickOnMapMock = jest.fn()
  jest.doMock('react-map-gl', () => {
    return ({
    __esModule: true,
    default: jest.fn(({ children }) => (
      <div>{ children }</div>
    ))
  })})

  test('given a list of markers, check that they appear in the map', () => {

    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Map onClick={clickOnMapMock} filterType={Category.All}/>
        </Suspense>
      </I18nextProvider>
    )

    

  })

})