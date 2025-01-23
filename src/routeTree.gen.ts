/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignupImport } from './routes/signup'
import { Route as LoginImport } from './routes/login'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as IndexImport } from './routes/index'
import { Route as AuthenticatedSettingsImport } from './routes/_authenticated/settings'
import { Route as AuthenticatedCreateCommunityImport } from './routes/_authenticated/create-community'
import { Route as CommunitypreviewIdPreviewImport } from './routes/_community_preview/$id/preview'
import { Route as AuthenticatedProfileIdIndexImport } from './routes/_authenticated/profile/$id/index'
import { Route as AuthenticatedChatIdIndexImport } from './routes/_authenticated/chat/$id/index'
import { Route as AuthenticatedCommunityIdIndexImport } from './routes/_authenticated/_community/$id/index'
import { Route as AuthenticatedCommunityIdMembersImport } from './routes/_authenticated/_community/$id/members'
import { Route as AuthenticatedCommunityIdClassroomImport } from './routes/_authenticated/_community/$id/classroom'
import { Route as AuthenticatedCommunityIdCalendarImport } from './routes/_authenticated/_community/$id/calendar'
import { Route as AuthenticatedCommunityIdAboutImport } from './routes/_authenticated/_community/$id/about'

// Create/Update Routes

const SignupRoute = SignupImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedSettingsRoute = AuthenticatedSettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedCreateCommunityRoute =
  AuthenticatedCreateCommunityImport.update({
    id: '/create-community',
    path: '/create-community',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const CommunitypreviewIdPreviewRoute = CommunitypreviewIdPreviewImport.update({
  id: '/_community_preview/$id/preview',
  path: '/$id/preview',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedProfileIdIndexRoute =
  AuthenticatedProfileIdIndexImport.update({
    id: '/profile/$id/',
    path: '/profile/$id/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedChatIdIndexRoute = AuthenticatedChatIdIndexImport.update({
  id: '/chat/$id/',
  path: '/chat/$id/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedCommunityIdIndexRoute =
  AuthenticatedCommunityIdIndexImport.update({
    id: '/_community/$id/',
    path: '/$id/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedCommunityIdMembersRoute =
  AuthenticatedCommunityIdMembersImport.update({
    id: '/_community/$id/members',
    path: '/$id/members',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedCommunityIdClassroomRoute =
  AuthenticatedCommunityIdClassroomImport.update({
    id: '/_community/$id/classroom',
    path: '/$id/classroom',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedCommunityIdCalendarRoute =
  AuthenticatedCommunityIdCalendarImport.update({
    id: '/_community/$id/calendar',
    path: '/$id/calendar',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedCommunityIdAboutRoute =
  AuthenticatedCommunityIdAboutImport.update({
    id: '/_community/$id/about',
    path: '/$id/about',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/create-community': {
      id: '/_authenticated/create-community'
      path: '/create-community'
      fullPath: '/create-community'
      preLoaderRoute: typeof AuthenticatedCreateCommunityImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/settings': {
      id: '/_authenticated/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof AuthenticatedSettingsImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_community_preview/$id/preview': {
      id: '/_community_preview/$id/preview'
      path: '/$id/preview'
      fullPath: '/$id/preview'
      preLoaderRoute: typeof CommunitypreviewIdPreviewImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/_community/$id/about': {
      id: '/_authenticated/_community/$id/about'
      path: '/$id/about'
      fullPath: '/$id/about'
      preLoaderRoute: typeof AuthenticatedCommunityIdAboutImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/_community/$id/calendar': {
      id: '/_authenticated/_community/$id/calendar'
      path: '/$id/calendar'
      fullPath: '/$id/calendar'
      preLoaderRoute: typeof AuthenticatedCommunityIdCalendarImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/_community/$id/classroom': {
      id: '/_authenticated/_community/$id/classroom'
      path: '/$id/classroom'
      fullPath: '/$id/classroom'
      preLoaderRoute: typeof AuthenticatedCommunityIdClassroomImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/_community/$id/members': {
      id: '/_authenticated/_community/$id/members'
      path: '/$id/members'
      fullPath: '/$id/members'
      preLoaderRoute: typeof AuthenticatedCommunityIdMembersImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/_community/$id/': {
      id: '/_authenticated/_community/$id/'
      path: '/$id'
      fullPath: '/$id'
      preLoaderRoute: typeof AuthenticatedCommunityIdIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/chat/$id/': {
      id: '/_authenticated/chat/$id/'
      path: '/chat/$id'
      fullPath: '/chat/$id'
      preLoaderRoute: typeof AuthenticatedChatIdIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/profile/$id/': {
      id: '/_authenticated/profile/$id/'
      path: '/profile/$id'
      fullPath: '/profile/$id'
      preLoaderRoute: typeof AuthenticatedProfileIdIndexImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedCreateCommunityRoute: typeof AuthenticatedCreateCommunityRoute
  AuthenticatedSettingsRoute: typeof AuthenticatedSettingsRoute
  AuthenticatedCommunityIdAboutRoute: typeof AuthenticatedCommunityIdAboutRoute
  AuthenticatedCommunityIdCalendarRoute: typeof AuthenticatedCommunityIdCalendarRoute
  AuthenticatedCommunityIdClassroomRoute: typeof AuthenticatedCommunityIdClassroomRoute
  AuthenticatedCommunityIdMembersRoute: typeof AuthenticatedCommunityIdMembersRoute
  AuthenticatedCommunityIdIndexRoute: typeof AuthenticatedCommunityIdIndexRoute
  AuthenticatedChatIdIndexRoute: typeof AuthenticatedChatIdIndexRoute
  AuthenticatedProfileIdIndexRoute: typeof AuthenticatedProfileIdIndexRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedCreateCommunityRoute: AuthenticatedCreateCommunityRoute,
  AuthenticatedSettingsRoute: AuthenticatedSettingsRoute,
  AuthenticatedCommunityIdAboutRoute: AuthenticatedCommunityIdAboutRoute,
  AuthenticatedCommunityIdCalendarRoute: AuthenticatedCommunityIdCalendarRoute,
  AuthenticatedCommunityIdClassroomRoute:
    AuthenticatedCommunityIdClassroomRoute,
  AuthenticatedCommunityIdMembersRoute: AuthenticatedCommunityIdMembersRoute,
  AuthenticatedCommunityIdIndexRoute: AuthenticatedCommunityIdIndexRoute,
  AuthenticatedChatIdIndexRoute: AuthenticatedChatIdIndexRoute,
  AuthenticatedProfileIdIndexRoute: AuthenticatedProfileIdIndexRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthenticatedRouteWithChildren
  '/login': typeof LoginRoute
  '/signup': typeof SignupRoute
  '/create-community': typeof AuthenticatedCreateCommunityRoute
  '/settings': typeof AuthenticatedSettingsRoute
  '/$id/preview': typeof CommunitypreviewIdPreviewRoute
  '/$id/about': typeof AuthenticatedCommunityIdAboutRoute
  '/$id/calendar': typeof AuthenticatedCommunityIdCalendarRoute
  '/$id/classroom': typeof AuthenticatedCommunityIdClassroomRoute
  '/$id/members': typeof AuthenticatedCommunityIdMembersRoute
  '/$id': typeof AuthenticatedCommunityIdIndexRoute
  '/chat/$id': typeof AuthenticatedChatIdIndexRoute
  '/profile/$id': typeof AuthenticatedProfileIdIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthenticatedRouteWithChildren
  '/login': typeof LoginRoute
  '/signup': typeof SignupRoute
  '/create-community': typeof AuthenticatedCreateCommunityRoute
  '/settings': typeof AuthenticatedSettingsRoute
  '/$id/preview': typeof CommunitypreviewIdPreviewRoute
  '/$id/about': typeof AuthenticatedCommunityIdAboutRoute
  '/$id/calendar': typeof AuthenticatedCommunityIdCalendarRoute
  '/$id/classroom': typeof AuthenticatedCommunityIdClassroomRoute
  '/$id/members': typeof AuthenticatedCommunityIdMembersRoute
  '/$id': typeof AuthenticatedCommunityIdIndexRoute
  '/chat/$id': typeof AuthenticatedChatIdIndexRoute
  '/profile/$id': typeof AuthenticatedProfileIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/login': typeof LoginRoute
  '/signup': typeof SignupRoute
  '/_authenticated/create-community': typeof AuthenticatedCreateCommunityRoute
  '/_authenticated/settings': typeof AuthenticatedSettingsRoute
  '/_community_preview/$id/preview': typeof CommunitypreviewIdPreviewRoute
  '/_authenticated/_community/$id/about': typeof AuthenticatedCommunityIdAboutRoute
  '/_authenticated/_community/$id/calendar': typeof AuthenticatedCommunityIdCalendarRoute
  '/_authenticated/_community/$id/classroom': typeof AuthenticatedCommunityIdClassroomRoute
  '/_authenticated/_community/$id/members': typeof AuthenticatedCommunityIdMembersRoute
  '/_authenticated/_community/$id/': typeof AuthenticatedCommunityIdIndexRoute
  '/_authenticated/chat/$id/': typeof AuthenticatedChatIdIndexRoute
  '/_authenticated/profile/$id/': typeof AuthenticatedProfileIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/login'
    | '/signup'
    | '/create-community'
    | '/settings'
    | '/$id/preview'
    | '/$id/about'
    | '/$id/calendar'
    | '/$id/classroom'
    | '/$id/members'
    | '/$id'
    | '/chat/$id'
    | '/profile/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/login'
    | '/signup'
    | '/create-community'
    | '/settings'
    | '/$id/preview'
    | '/$id/about'
    | '/$id/calendar'
    | '/$id/classroom'
    | '/$id/members'
    | '/$id'
    | '/chat/$id'
    | '/profile/$id'
  id:
    | '__root__'
    | '/'
    | '/_authenticated'
    | '/login'
    | '/signup'
    | '/_authenticated/create-community'
    | '/_authenticated/settings'
    | '/_community_preview/$id/preview'
    | '/_authenticated/_community/$id/about'
    | '/_authenticated/_community/$id/calendar'
    | '/_authenticated/_community/$id/classroom'
    | '/_authenticated/_community/$id/members'
    | '/_authenticated/_community/$id/'
    | '/_authenticated/chat/$id/'
    | '/_authenticated/profile/$id/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  LoginRoute: typeof LoginRoute
  SignupRoute: typeof SignupRoute
  CommunitypreviewIdPreviewRoute: typeof CommunitypreviewIdPreviewRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  LoginRoute: LoginRoute,
  SignupRoute: SignupRoute,
  CommunitypreviewIdPreviewRoute: CommunitypreviewIdPreviewRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authenticated",
        "/login",
        "/signup",
        "/_community_preview/$id/preview"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/create-community",
        "/_authenticated/settings",
        "/_authenticated/_community/$id/about",
        "/_authenticated/_community/$id/calendar",
        "/_authenticated/_community/$id/classroom",
        "/_authenticated/_community/$id/members",
        "/_authenticated/_community/$id/",
        "/_authenticated/chat/$id/",
        "/_authenticated/profile/$id/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/signup": {
      "filePath": "signup.tsx"
    },
    "/_authenticated/create-community": {
      "filePath": "_authenticated/create-community.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/settings": {
      "filePath": "_authenticated/settings.tsx",
      "parent": "/_authenticated"
    },
    "/_community_preview/$id/preview": {
      "filePath": "_community_preview/$id/preview.tsx"
    },
    "/_authenticated/_community/$id/about": {
      "filePath": "_authenticated/_community/$id/about.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/_community/$id/calendar": {
      "filePath": "_authenticated/_community/$id/calendar.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/_community/$id/classroom": {
      "filePath": "_authenticated/_community/$id/classroom.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/_community/$id/members": {
      "filePath": "_authenticated/_community/$id/members.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/_community/$id/": {
      "filePath": "_authenticated/_community/$id/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/chat/$id/": {
      "filePath": "_authenticated/chat/$id/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/profile/$id/": {
      "filePath": "_authenticated/profile/$id/index.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
