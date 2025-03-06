'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { AppDispatch, RootState } from '@/store';
import { fetchProjectById } from '@/store/slices/projectSlice';
import { fetchFormsByProject } from '@/store/slices/formSlice';
import MainLayout from '@/components/layout/MainLayout';
import { formatDate } from '@/utils/formatters';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const dispatch = useDispatch<AppDispatch>();
  const { currentProject, loading: projectLoading, error: projectError } = useSelector((state: RootState) => state.projects);
  const { forms, loading: formsLoading, error: formsError } = useSelector((state: RootState) => state.forms);

  useEffect(() => {
    dispatch(fetchProjectById(params.id));
    dispatch(fetchFormsByProject(params.id));
  }, [dispatch, params.id]);

  if (projectLoading && !currentProject) {
    return (
      <MainLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </MainLayout>
    );
  }

  if (projectError) {
    return (
      <MainLayout>
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Error Loading Project</h1>
          <p className="text-red-500 mb-4">{projectError}</p>
          <Button 
            onClick={() => dispatch(fetchProjectById(params.id))}
          >
            Retry
          </Button>
        </div>
      </MainLayout>
    );
  }

  if (!currentProject) {
    return (
      <MainLayout>
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Project Not Found</h1>
          <p className="text-gray-500 mb-4">The project you're looking for doesn't exist or you don't have access to it.</p>
          <Link href="/projects">
            <Button>
              Back to Projects
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Project Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{currentProject.name}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Project #{currentProject.number} • {currentProject.type}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Link href={`/projects/${params.id}/edit`}>
              <Button variant="outline">
                Edit Project
              </Button>
            </Link>
            <Link href={`/reports/new?projectId=${params.id}`}>
              <Button>
                Generate Report
              </Button>
            </Link>
          </div>
        </div>

        {/* Status Badge */}
        <div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            currentProject.status === 'Active' 
              ? 'bg-green-100 text-green-800' 
              : currentProject.status === 'Pending'
                ? 'bg-yellow-100 text-yellow-800'
                : currentProject.status === 'Completed'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
          }`}>
            {currentProject.status}
          </span>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1 text-sm text-gray-900">{currentProject.description || 'No description provided'}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Client</h3>
                  <p className="mt-1 text-sm text-gray-900">{currentProject.client.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {currentProject.client.contact?.name || 'Not specified'}
                  </p>
                  {currentProject.client.contact?.email && (
                    <p className="text-sm text-gray-500">{currentProject.client.contact.email}</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {currentProject.location.address}, {currentProject.location.city}, {currentProject.location.state} {currentProject.location.zipCode}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Created</h3>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(currentProject.createdAt)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(currentProject.updatedAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team & Activities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Assigned Team Members</h3>
                {currentProject.assignedUsers && currentProject.assignedUsers.length > 0 ? (
                  <ul className="mt-2 divide-y divide-gray-200">
                    {currentProject.assignedUsers.map((user) => (
                      <li key={user.id} className="py-2 flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center text-white">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.role}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-sm text-gray-500">No team members assigned</p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Recent Activity</h3>
                <ul className="mt-2 space-y-2">
                  <li className="text-sm text-gray-500">
                    <span className="text-gray-900 font-medium">Jane Doe</span> created a new form on {formatDate(new Date().toISOString())}
                  </li>
                  <li className="text-sm text-gray-500">
                    <span className="text-gray-900 font-medium">Mark Wilson</span> updated the project status on {formatDate(new Date(Date.now() - 86400000).toISOString())}
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Forms Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Forms</h2>
            <Link href={`/forms/new?projectId=${params.id}`}>
              <Button size="sm">
                New Form
              </Button>
            </Link>
          </div>

          {formsLoading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : forms && forms.length > 0 ? (
            <Card>
              <ul className="divide-y divide-gray-200">
                {forms.map((form) => (
                  <li key={form.id} className="p-4 hover:bg-gray-50">
                    <Link 
                      href={`/forms/${form.id}`}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium text-primary">{form.name}</p>
                        <p className="text-sm text-gray-500">
                          {form.type.charAt(0).toUpperCase() + form.type.slice(1)} • Created on {formatDate(form.createdAt)}
                        </p>
                      </div>
                      <div>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          form.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : form.status === 'in-progress'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {form.status === 'in-progress' 
                            ? 'In Progress' 
                            : form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No forms yet</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new form.</p>
                <div className="mt-6">
                  <Link href={`/forms/new?projectId=${params.id}`}>
                    <Button>
                      <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      New Form
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Map Section */}
        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent className="h-64 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500">Map view would be displayed here</p>
              <p className="text-sm text-gray-400">Integration with Google Maps API</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}