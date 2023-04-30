import { Suspense } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import i18n from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next';

import Loader from '../Loader';
import DeleteButton from '.';


i18n.use(initReactI18next).init({
  fallbackLng: 'en',
})

describe('deleteButton', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
  
    test('deleteButton click no marker', async () =>{
      render(
        <I18nextProvider i18n={i18n}>
          <Suspense fallback={<Loader />}>
            <DeleteButton id={'1'} type={'marker'}></DeleteButton>
          </Suspense>
        </I18nextProvider>
      )
      await waitFor(() => expect(screen.getByLabelText('sidebar.list.delete.tooltip')).toBeInTheDocument())
      const deleteButton = screen.getByLabelText('sidebar.list.delete.tooltip');
      fireEvent.click(deleteButton);
  
  
      await waitFor(() => expect(screen.getByText('sidebar.list.delete.confirm.no')).toBeInTheDocument())
      const noButton = screen.getByText('sidebar.list.delete.confirm.no');
      fireEvent.click(noButton);
      
    }); 
  
    test('deleteButton click yes marker', async () =>{
      render(
        <I18nextProvider i18n={i18n}>
          <Suspense fallback={<Loader />}>
            <DeleteButton id={'1'} type={'marker'}></DeleteButton>
          </Suspense>
        </I18nextProvider>
      )
      await waitFor(() => expect(screen.getByLabelText('sidebar.list.delete.tooltip')).toBeInTheDocument())
      const deleteButton = screen.getByLabelText('sidebar.list.delete.tooltip');
      fireEvent.click(deleteButton);
  
  
      await waitFor(() => expect(screen.getByText('sidebar.list.delete.confirm.yes')).toBeInTheDocument())
      const yesButton = screen.getByText('sidebar.list.delete.confirm.yes');
      fireEvent.click(yesButton);
      
    }); 
    test('deleteButton click yes route', async () =>{
      render(
        <I18nextProvider i18n={i18n}>
          <Suspense fallback={<Loader />}>
            <DeleteButton id={'1'} type={'route'}></DeleteButton>
          </Suspense>
        </I18nextProvider>
      )
      await waitFor(() => expect(screen.getByLabelText('sidebar.list.delete.tooltip')).toBeInTheDocument())
      const deleteButton = screen.getByLabelText('sidebar.list.delete.tooltip');
      fireEvent.click(deleteButton);
  
  
      await waitFor(() => expect(screen.getByText('sidebar.list.delete.confirm.yes')).toBeInTheDocument())
      const yesButton = screen.getByText('sidebar.list.delete.confirm.yes');
      fireEvent.click(yesButton);
      
    }); 
  });