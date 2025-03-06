'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';

// Profile update validation schema
const ProfileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  jobTitle: Yup.string().required('Job title is required'),
  phone: Yup.string().matches(/^[0-9\-\+\(\) ]+$/, 'Invalid phone number'),
  emailNotifications: Yup.boolean(),
  pushNotifications: Yup.boolean(),
  theme: Yup.string().oneOf(['light', 'dark', 'system'], 'Invalid theme selection'),
});

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Initial form values with default values if session is not loaded yet
  const initialValues = {
    name: session?.user?.name || '',
    jobTitle: session?.user?.jobTitle || 'Field Inspector',
    phone: session?.user?.phone || '',
    emailNotifications: session?.user?.preferences?.notifications?.email || true,
    pushNotifications: session?.user?.preferences?.notifications?.push || true,
    theme: session?.user?.preferences?.theme || 'system',
  };

  const handleSubmit = async (values: typeof initialValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    setSaveSuccess(false);
    setSaveError('');

    // This would normally be an API call to update the user profile
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update session with new values
      await update({
        ...session,
        user: {
          ...session?.user,
          name: values.name,
          jobTitle: values.jobTitle,
          phone: values.phone,
          preferences: {
            notifications: {
              email: values.emailNotifications,
              push: values.pushNotifications,
            },
            theme: values.theme,
          },
        },
      });
      
      setSaveSuccess(true);
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveError('Failed to update profile. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Profile Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Update your account information and preferences
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Your account details and preferences.</p>
          </div>
          
          <Formik
            initialValues={initialValues}
            validationSchema={ProfileSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, dirty }) => (
              <Form className="border-t border-gray-200 divide-y divide-gray-200">
                {/* Personal Information Section */}
                <div className="px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <div className="flex items-center">
                        <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                          {session?.user?.image ? (
                            <Image
                              src={session.user.image}
                              alt={session.user.name || ''}
                              width={96}
                              height={96}
                              className="h-24 w-24 object-cover"
                            />
                          ) : (
                            <div className="h-24 w-24 flex items-center justify-center bg-primary text-white text-2xl font-medium">
                              {session?.user?.name?.charAt(0) || 'U'}
                            </div>
                          )}
                        </div>
                        <div className="ml-5">
                          <button
                            type="button"
                            className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                          >
                            Change photo
                          </button>
                          <p className="mt-1 text-xs text-gray-500">
                            JPG, GIF or PNG. 1MB max.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full name
                      </label>
                      <div className="mt-1">
                        <Field
                          type="text"
                          name="name"
                          id="name"
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                        Job title
                      </label>
                      <div className="mt-1">
                        <Field
                          type="text"
                          name="jobTitle"
                          id="jobTitle"
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="jobTitle" component="div" className="mt-1 text-sm text-red-600" />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          id="email"
                          value={session?.user?.email || ''}
                          disabled
                          className="bg-gray-50 shadow-sm block w-full sm:text-sm border-gray-300 rounded-md cursor-not-allowed"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          Email cannot be changed (managed by SSO provider)
                        </p>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone number
                      </label>
                      <div className="mt-1">
                        <Field
                          type="text"
                          name="phone"
                          id="phone"
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="phone" component="div" className="mt-1 text-sm text-red-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="px-4 py-5 sm:p-6">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Notification Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <Field
                            id="emailNotifications"
                            name="emailNotifications"
                            type="checkbox"
                            className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="emailNotifications" className="font-medium text-gray-700">Email notifications</label>
                          <p className="text-gray-500">Receive email notifications for project updates, assignments, and reports.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <Field
                            id="pushNotifications"
                            name="pushNotifications"
                            type="checkbox"
                            className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="pushNotifications" className="font-medium text-gray-700">Push notifications</label>
                          <p className="text-gray-500">Receive push notifications in the mobile app for assignments and urgent updates.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Appearance Settings */}
                <div className="px-4 py-5 sm:p-6">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Appearance</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                          Theme preference
                        </label>
                        <div className="mt-1">
                          <Field
                            as="select"
                            id="theme"
                            name="theme"
                            className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="system">Use system setting</option>
                          </Field>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="px-4 py-5 sm:p-6 bg-gray-50 flex flex-col sm:flex-row-reverse sm:px-6 space-y-2 sm:space-y-0">
                  <button
                    type="submit"
                    disabled={isSubmitting || !dirty}
                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 ${
                      isSubmitting || !dirty
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-primary hover:bg-primary-dark'
                    }`}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Cancel
                  </button>
                  
                  {/* Success/Error Messages */}
                  {saveSuccess && (
                    <div className="sm:ml-3 inline-flex items-center text-sm text-green-600">
                      <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Profile updated successfully!
                    </div>
                  )}
                  
                  {saveError && (
                    <div className="sm:ml-3 inline-flex items-center text-sm text-red-600">
                      <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {saveError}
                    </div>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </MainLayout>
  );
}