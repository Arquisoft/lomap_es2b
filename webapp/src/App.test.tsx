import { Suspense } from 'react';
import i18n from 'i18next'
import { render, screen, waitFor,fireEvent } from '@testing-library/react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import App from './App';
import Sidebar from './components/MarkersSidebar';
import { Category } from './types/Category';
import Loader from './components/Loader';

const mockToggleSidebar = jest.fn();
const mocksetSelectedCategory= jest.fn();
i18n.use(initReactI18next).init({
  fallbackLng: 'en',
})


test('Renders app', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
  waitFor(() => expect(screen.getAllByText("LoMap")[0]).toBeInTheDocument())
});

describe('sideBar', () => {
  afterEach(() => {
    mockToggleSidebar.mockClear();
    mocksetSelectedCategory.mockClear();
  });


  test('sideBar render', async () =>{
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Sidebar toggleSidebar={mockToggleSidebar} selectedCategory={Category.All} setSelectedCategory={mocksetSelectedCategory}/>
        </Suspense>
      </I18nextProvider>
    )
    await waitFor(() => expect(screen.getByText('sidebar.list.title')).toBeInTheDocument())
  }); 
});