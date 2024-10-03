import { createServerClient } from '@supabase/ssr'
import { type Handle, redirect } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { PUBLIC_SUPABASE_ANON, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { PROTECTED_ROUTES, PROTECTED_ROUTE_PATTERNS, PUBLIC_ROUTES } from '$lib/utils/constants'

const supabase: Handle = async ({ event, resolve }) => {
	/**
	 * Creates a Supabase client specific to this server request.
	 * The Supabase client gets the Auth token from the request cookies.
	 */
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			setAll: (cookiesToSet) => {
				cookiesToSet.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, { ...options, path: '/' })
				})
			}
		}
	})

	/**
	 * Unlike `supabase.auth.getSession()`, which returns the session _without_
	 * validating the JWT, this function also calls `getUser()` to validate the
	 * JWT before returning the session.
	 */
	event.locals.safeGetSession = async () => {
		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser()
		if (error) {
			// JWT validation has failed
			return { session: null, user: null }
		}

		return { user }
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-api-version'
		}
	})
}

const authGuard: Handle = async ({ event, resolve }) => {
	const { user } = await event.locals.safeGetSession()
	event.locals.user = user

	if (
		(!event.locals.user && PROTECTED_ROUTES.includes(event.url.pathname)) ||
		PROTECTED_ROUTE_PATTERNS.some((pattern) => pattern.test(event.url.pathname))
	) {
		redirect(303, '/auth/login')
	}

	if (event.locals.user && PUBLIC_ROUTES.includes(event.url.pathname)) {
		redirect(303, '/')
	}

	return resolve(event)
}

export const handle: Handle = sequence(supabase, authGuard)
