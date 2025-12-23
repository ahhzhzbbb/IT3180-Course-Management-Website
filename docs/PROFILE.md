# Profile & Phone Verification

## Endpoints

- GET `/api/auth/user` — get current user details
- PUT `/api/users/me` — update current user's profile (username is ignored)
  - Body: `{ name, phoneNumber, birth, gender, state }`

## Notes

- For security, the server no longer returns verification codes in API responses in production; instead, codes must be sent via SMS or email.
- Username changes are restricted: users cannot change their own username via `/users/me`.
- Changing password should use a dedicated flow requiring the old password.

## Visual Updates

- The **Profile**, **Dashboard**, and **Course Detail** pages received a visual refresh to a modern, responsive theme (CSS-only changes). See `docs/STYLE_GUIDE.md` for review steps and visual testing guidance.
